import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDCnQqTSx97mzh2exvvRxWVbiwsJxIeJm4",
  authDomain: "crud-sederhana-3a4db.firebaseapp.com",
  projectId: "crud-sederhana-3a4db",
  storageBucket: "crud-sederhana-3a4db.firebasestorage.app",
  messagingSenderId: "742843486434",
  appId: "1:742843486434:web:bda69efe807bbe58448ebb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
