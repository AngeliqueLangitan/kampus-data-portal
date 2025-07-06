import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Shield } from "lucide-react";
import StudentForm from "@/components/StudentForm";
import StudentTable from "@/components/StudentTable";
import Navigation from "@/components/Navigation";
import { useStudents } from "@/hooks/useStudents";
import { useAuth } from "@/hooks/useAuth";

export interface Student {
  id: string;
  nama: string;
  nim: string;
  jurusan: string;
}

const Index = () => {
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const { students, loading, addStudent, updateStudent, deleteStudent } = useStudents();
  const { user } = useAuth();

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const cancelEdit = () => {
    setEditingStudent(null);
  };

  const handleSubmit = (studentData: Omit<Student, "id">) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, studentData);
      setEditingStudent(null);
    } else {
      addStudent(studentData);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data mahasiswa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Sistem Manajemen Data Mahasiswa
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Kelola data mahasiswa dengan mudah dan efisien menggunakan Firebase
                  </p>
                </div>
                {user && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{user.displayName || user.username}</span>
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <StudentForm
                onSubmit={handleSubmit}
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
    </div>
  );
};

export default Index;
