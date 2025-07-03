
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Users } from "lucide-react";
import { Student } from "@/pages/Index";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentTable = ({ students, onEdit, onDelete }: StudentTableProps) => {
  const getJurusan Badge = (jurusan: string) => {
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

  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-600" />
          Daftar Mahasiswa
          <Badge variant="secondary" className="ml-auto">
            {students.length} mahasiswa
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {students.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium mb-2">
              Belum ada data mahasiswa
            </p>
            <p className="text-gray-400">
              Tambahkan data mahasiswa pertama menggunakan form di sebelah kiri
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
                {students.map((student, index) => (
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
