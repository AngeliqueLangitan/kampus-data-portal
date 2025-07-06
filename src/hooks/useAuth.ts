import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { toast } from 'sonner';

interface User {
  uid: string;
  email: string;
  username: string;
  role: 'admin' | 'user';
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updateUserProfile: (data: Partial<User>) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as Omit<User, 'uid' | 'email' | 'emailVerified'>;
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              emailVerified: firebaseUser.emailVerified,
              ...userData,
            });
          } else {
            const newUser: Omit<User, 'uid' | 'email' | 'emailVerified'> = {
              username: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
              role: 'user',
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || '',
              createdAt: new Date(),
              lastLoginAt: new Date(),
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
            
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              emailVerified: firebaseUser.emailVerified,
              ...newUser,
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to load user data');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        lastLoginAt: new Date(),
      }, { merge: true });
      
      toast.success('Login successful!');
      return true;
    } catch (error: any) {
      let errorMessage = 'Login failed';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Email not registered';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Wrong password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many login attempts. Try again later';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Account has been disabled';
          break;
        default:
          errorMessage = 'Login error occurred';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      
      const userData: Omit<User, 'uid' | 'email' | 'emailVerified'> = {
        username,
        role: 'user',
        displayName: username,
        photoURL: '',
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };
      
      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      } catch (firestoreError) {
        // Firestore write failed, but registration succeeded
        console.error('Firestore user creation failed:', firestoreError);
        toast.warning('Akun berhasil dibuat, tapi data profil gagal disimpan.');
      }
      
      toast.success('Registrasi berhasil!');
      return true;
    } catch (error: any) {
      let errorMessage = 'Registrasi gagal';
      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Email sudah terdaftar';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password terlalu lemah (minimal 6 karakter)';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Format email tidak valid';
            break;
          default:
            errorMessage = error.message || 'Terjadi kesalahan saat registrasi';
        }
      } else if (typeof error.message === 'string') {
        errorMessage = error.message;
      }
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Logout successful!');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Logout failed');
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
      return true;
    } catch (error: any) {
      let errorMessage = 'Failed to send password reset email';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Email not registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format';
          break;
        default:
          errorMessage = 'Error sending password reset email';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      setLoading(true);
      setError(null);
      
      await setDoc(doc(db, 'users', user.uid), data, { merge: true });
      
      setUser(prev => prev ? { ...prev, ...data } : null);
      
      toast.success('Profile updated successfully!');
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
      toast.error('Failed to update profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile,
    loading,
    error,
  };
};
