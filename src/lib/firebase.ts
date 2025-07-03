
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC123example", // Ganti dengan API key Firebase Anda
  authDomain: "your-project.firebaseapp.com", // Ganti dengan auth domain Anda
  projectId: "your-project-id", // Ganti dengan project ID Anda
  storageBucket: "your-project.appspot.com", // Ganti dengan storage bucket Anda
  messagingSenderId: "123456789", // Ganti dengan messaging sender ID Anda
  appId: "1:123456789:web:abcdef123456" // Ganti dengan app ID Anda
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
