import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Users, Search } from "lucide-react";
import { Student } from "@/pages/Index";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentTable = ({ students, onEdit, onDelete }: StudentTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getJurusanBadge = (jurusan: string) => {
    const colorMap = {
      "Teknik Informatika": "bg-blue-100 text-blue-800 border-blue-200",
      "Sistem Informasi": "bg-green-100 text-green-800 border-green-200",
      "Teknik Elektro": "bg-purple-100 text-purple-800 border-purple-200",
    };
    return colorMap[jurusan as keyof typeof colorMap] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleDelete = (student: Student) => {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus data mahasiswa ${student.nama}?`
    );
    if (confirmed) {
      onDelete(student.id);
    }
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    
    // Search by NIM
    if (student.nim.toLowerCase().includes(searchLower)) return true;
    
    // Search by jurusan
    if (student.jurusan.toLowerCase().includes(searchLower)) return true;
    
    // Search by nama
    if (student.nama.toLowerCase().includes(searchLower)) return true;
    
    // Search by initials (only for names, not majors)
    const nameInitials = getInitials(student.nama);
    if (nameInitials.toLowerCase().includes(searchLower)) return true;
    
    return false;
  });

  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-600" />
          Daftar Mahasiswa
          <Badge variant="secondary" className="ml-auto">
            {filteredStudents.length} dari {students.length} mahasiswa
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-500 mt-2">
              Menampilkan {filteredStudents.length} hasil dari pencarian "{searchTerm}"
            </p>
          )}
        </div>

        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium mb-2">
              {searchTerm ? "Tidak ada hasil pencarian" : "Belum ada data mahasiswa"}
            </p>
            <p className="text-gray-400">
              {searchTerm 
                ? `Tidak ditemukan data yang cocok dengan "${searchTerm}"`
                : "Tambahkan data mahasiswa pertama menggunakan form di sebelah kiri"
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-900 py-4">No</TableHead>
                  <TableHead className="font-semibold text-gray-900">Nama</TableHead>
                  <TableHead className="font-semibold text-gray-900">NIM</TableHead>
                  <TableHead className="font-semibold text-gray-900">Jurusan</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <TableCell className="font-medium text-gray-600 py-4">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {student.nama}
                    </TableCell>
                    <TableCell className="text-gray-700 font-mono">
                      {student.nim}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getJurusanBadge(student.jurusan)} font-medium`}
                      >
                        {student.jurusan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(student)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(student)}
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentTable;
