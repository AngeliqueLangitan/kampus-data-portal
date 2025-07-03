
import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Student } from '@/pages/Index';
import { toast } from 'sonner';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentsCollection = collection(db, 'students');
    const q = query(studentsCollection, orderBy('nama'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const studentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Student[];
      
      setStudents(studentsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching students:', error);
      toast.error('Gagal mengambil data mahasiswa');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addStudent = async (studentData: Omit<Student, 'id'>) => {
    try {
      await addDoc(collection(db, 'students'), studentData);
      toast.success('Data mahasiswa berhasil disimpan!');
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error('Gagal menyimpan data mahasiswa');
    }
  };

  const updateStudent = async (id: string, studentData: Omit<Student, 'id'>) => {
    try {
      const studentDoc = doc(db, 'students', id);
      await updateDoc(studentDoc, studentData);
      toast.success('Data mahasiswa berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('Gagal memperbarui data mahasiswa');
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const studentDoc = doc(db, 'students', id);
      await deleteDoc(studentDoc);
      toast.success('Data mahasiswa berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Gagal menghapus data mahasiswa');
    }
  };

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
  };
};
