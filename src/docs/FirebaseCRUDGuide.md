# Panduan Lengkap CRUD Firebase Firestore

## 1. CREATE (Membuat Data)

### Menambah Dokumen Baru dengan Auto-Generated ID
```typescript
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const addNewDocument = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, 'collectionName'), data);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

// Penggunaan
await addNewDocument({
  name: 'John Doe',
  email: 'john@example.com',
  age: 25,
  createdAt: new Date()
});
```

### Menambah Dokumen dengan Custom ID
```typescript
import { doc, setDoc } from 'firebase/firestore';

const addDocumentWithCustomId = async (id: string, data: any) => {
  try {
    await setDoc(doc(db, 'collectionName', id), data);
    console.log('Document added with custom ID: ', id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

// Penggunaan
await addDocumentWithCustomId('user123', {
  name: 'Jane Doe',
  email: 'jane@example.com'
});
```

## 2. READ (Membaca Data)

### Membaca Semua Dokumen
```typescript
import { collection, getDocs } from 'firebase/firestore';

const getAllDocuments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'collectionName'));
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return documents;
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
};
```

### Membaca Dokumen Berdasarkan ID
```typescript
import { doc, getDoc } from 'firebase/firestore';

const getDocumentById = async (id: string) => {
  try {
    const docRef = doc(db, 'collectionName', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document: ', error);
  }
};
```

### Real-time Listener (Live Updates)
```typescript
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const subscribeToDocuments = () => {
  const q = query(collection(db, 'collectionName'), orderBy('createdAt', 'desc'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Current documents: ', documents);
  }, (error) => {
    console.error('Error listening to documents: ', error);
  });
  
  // Jangan lupa untuk unsubscribe ketika komponen unmount
  return unsubscribe;
};
```

## 3. UPDATE (Mengupdate Data)

### Mengupdate Dokumen
```typescript
import { doc, updateDoc } from 'firebase/firestore';

const updateDocument = async (id: string, updateData: any) => {
  try {
    const docRef = doc(db, 'collectionName', id);
    await updateDoc(docRef, updateData);
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

// Penggunaan
await updateDocument('user123', {
  name: 'Updated Name',
  age: 26
});
```

### Mengupdate Dokumen dengan setDoc (Overwrite)
```typescript
import { doc, setDoc } from 'firebase/firestore';

const overwriteDocument = async (id: string, data: any) => {
  try {
    await setDoc(doc(db, 'collectionName', id), data, { merge: true });
    console.log('Document overwritten successfully');
  } catch (error) {
    console.error('Error overwriting document: ', error);
  }
};
```

## 4. DELETE (Menghapus Data)

### Menghapus Dokumen
```typescript
import { doc, deleteDoc } from 'firebase/firestore';

const deleteDocument = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'collectionName', id));
    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};
```

### Menghapus Multiple Dokumen
```typescript
const deleteMultipleDocuments = async (ids: string[]) => {
  try {
    const deletePromises = ids.map(id => deleteDoc(doc(db, 'collectionName', id)));
    await Promise.all(deletePromises);
    console.log('Multiple documents deleted successfully');
  } catch (error) {
    console.error('Error deleting multiple documents: ', error);
  }
};
```

## 5. QUERYING (Pencarian & Filtering)

### Filtering dengan where()
```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';

const getFilteredDocuments = async () => {
  try {
    // Filter berdasarkan field
    const q = query(
      collection(db, 'users'),
      where('age', '>=', 18),
      where('isActive', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return documents;
  } catch (error) {
    console.error('Error getting filtered documents: ', error);
  }
};
```

### Sorting dengan orderBy()
```typescript
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const getSortedDocuments = async () => {
  try {
    const q = query(
      collection(db, 'products'),
      orderBy('price', 'desc'), // Urutkan berdasarkan harga (descending)
      orderBy('name', 'asc')    // Kemudian berdasarkan nama (ascending)
    );
    
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return documents;
  } catch (error) {
    console.error('Error getting sorted documents: ', error);
  }
};
```

### Limiting Results
```typescript
import { collection, query, limit, getDocs } from 'firebase/firestore';

const getLimitedDocuments = async (limitCount: number) => {
  try {
    const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return documents;
  } catch (error) {
    console.error('Error getting limited documents: ', error);
  }
};
```

## 6. HOOK CUSTOM untuk CRUD

```typescript
import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useFirebaseCRUD = <T extends { id?: string }>(
  collectionName: string,
  options?: {
    orderByField?: string;
    orderDirection?: 'asc' | 'desc';
    whereConditions?: Array<{
      field: string;
      operator: '==' | '!=' | '<' | '<=' | '>' | '>=';
      value: any;
    }>;
  }
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Real-time listener
  useEffect(() => {
    let q = query(collection(db, collectionName));
    
    if (options?.whereConditions) {
      options.whereConditions.forEach(condition => {
        q = query(q, where(condition.field, condition.operator, condition.value));
      });
    }
    
    if (options?.orderByField) {
      q = query(q, orderBy(options.orderByField, options.orderDirection || 'asc'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
      
      setData(documents);
      setLoading(false);
      setError(null);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [collectionName, options?.orderByField, options?.orderDirection, JSON.stringify(options?.whereConditions)]);

  // CRUD operations
  const create = async (newData: Omit<T, 'id'>) => {
    try {
      await addDoc(collection(db, collectionName), newData);
    } catch (error) {
      throw error;
    }
  };

  const update = async (id: string, updateData: Partial<Omit<T, 'id'>>) => {
    try {
      await updateDoc(doc(db, collectionName, id), updateData);
    } catch (error) {
      throw error;
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      throw error;
    }
  };

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
  };
};
```

## 7. BEST PRACTICES

### 1. Error Handling
```typescript
const handleFirebaseOperation = async (operation: () => Promise<any>) => {
  try {
    await operation();
    toast.success('Operation successful!');
  } catch (error) {
    console.error('Firebase error:', error);
    toast.error('Operation failed: ' + error.message);
  }
};
```

### 2. Loading States
```typescript
const [loading, setLoading] = useState(false);

const performOperation = async () => {
  setLoading(true);
  try {
    await firebaseOperation();
  } finally {
    setLoading(false);
  }
};
```

### 3. Data Validation
```typescript
const validateData = (data: any) => {
  if (!data.name || data.name.trim() === '') {
    throw new Error('Name is required');
  }
  if (data.age && (data.age < 0 || data.age > 150)) {
    throw new Error('Invalid age');
  }
  return data;
};
```

### 4. Security Rules
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 8. CONTOH PENGGUNAAN LENGKAP

```typescript
// Komponen React dengan CRUD lengkap
import React, { useState } from 'react';
import { useFirebaseCRUD } from '@/hooks/useFirebaseCRUD';

interface User {
  id?: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

export const UserManagement = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    age: 0,
    isActive: true
  });

  const {
    data: users,
    loading,
    create,
    update,
    remove
  } = useFirebaseCRUD<User>('users', {
    orderByField: 'name',
    orderDirection: 'asc'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create(newUser);
      setNewUser({ name: '', email: '', age: 0, isActive: true });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
          placeholder="Email"
          required
        />
        <input
          type="number"
          value={newUser.age}
          onChange={(e) => setNewUser({...newUser, age: Number(e.target.value)})}
          placeholder="Age"
          required
        />
        <button type="submit">Add User</button>
      </form>

      <div>
        {users.map(user => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email} - Age: {user.age}</p>
            <button onClick={() => update(user.id!, { isActive: !user.isActive })}>
              Toggle Status
            </button>
            <button onClick={() => remove(user.id!)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
```

Dengan panduan ini, Anda sudah memiliki pengetahuan lengkap untuk melakukan operasi CRUD di Firebase Firestore! 