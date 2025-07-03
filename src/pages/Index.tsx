
import { useState } from "react";
import { toast } from "sonner";
import StudentForm from "@/components/StudentForm";
import StudentTable from "@/components/StudentTable";

export interface Student {
  id: string;
  nama: string;
  nim: string;
  jurusan: string;
}

const Index = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const addStudent = (studentData: Omit<Student, "id">) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
    };
    setStudents([...students, newStudent]);
    toast.success("Data mahasiswa berhasil disimpan!");
  };

  const updateStudent = (id: string, studentData: Omit<Student, "id">) => {
    setStudents(students.map(student => 
      student.id === id ? { ...studentData, id } : student
    ));
    setEditingStudent(null);
    toast.success("Data mahasiswa berhasil diperbarui!");
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
    toast.success("Data mahasiswa berhasil dihapus!");
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const cancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Sistem Manajemen Data Mahasiswa
            </h1>
            <p className="text-gray-600 mt-1">
              Kelola data mahasiswa dengan mudah dan efisien
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <StudentForm
              onSubmit={editingStudent ? 
                (data) => updateStudent(editingStudent.id, data) : 
                addStudent
              }
              editingStudent={editingStudent}
              onCancelEdit={cancelEdit}
            />
          </div>
          
          <div className="lg:col-span-2">
            <StudentTable
              students={students}
              onEdit={handleEdit}
              onDelete={deleteStudent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
