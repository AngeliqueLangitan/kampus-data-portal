import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "@/pages/Index";

interface StudentFormProps {
  onSubmit: (student: Omit<Student, "id">) => void;
  editingStudent?: Student | null;
  onCancelEdit?: () => void;
}

const StudentForm = ({ onSubmit, editingStudent, onCancelEdit }: StudentFormProps) => {
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    jurusan: "",
  });

  const [errors, setErrors] = useState({
    nama: "",
    nim: "",
    jurusan: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        nama: editingStudent.nama,
        nim: editingStudent.nim,
        jurusan: editingStudent.jurusan,
      });
    }
  }, [editingStudent]);

  const validateForm = () => {
    const newErrors = {
      nama: "",
      nim: "",
      jurusan: "",
    };

    if (!formData.nama.trim()) {
      newErrors.nama = "Nama harus diisi";
    }

    if (!formData.nim.trim()) {
      newErrors.nim = "NIM harus diisi";
    } else if (formData.nim.length < 8) {
      newErrors.nim = "NIM minimal 8 karakter";
    }

    if (!formData.jurusan) {
      newErrors.jurusan = "Jurusan harus dipilih";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      nama: "",
      nim: "",
      jurusan: "",
    });
    setErrors({
      nama: "",
      nim: "",
      jurusan: "",
    });
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <CardTitle className="text-blue-900 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          {editingStudent ? "Edit Data Mahasiswa" : "Tambah Data Mahasiswa"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nama" className="text-sm font-medium text-gray-700">
              Nama Lengkap
            </Label>
            <Input
              id="nama"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.nama}
              onChange={(e) => handleInputChange("nama", e.target.value)}
              className={`transition-all duration-200 ${errors.nama ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"}`}
            />
            {errors.nama && (
              <p className="text-sm text-red-500 mt-1">{errors.nama}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nim" className="text-sm font-medium text-gray-700">
              NIM (Nomor Induk Mahasiswa)
            </Label>
            <Input
              id="nim"
              type="text"
              placeholder="Masukkan NIM"
              value={formData.nim}
              onChange={(e) => handleInputChange("nim", e.target.value)}
              className={`transition-all duration-200 ${errors.nim ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"}`}
            />
            {errors.nim && (
              <p className="text-sm text-red-500 mt-1">{errors.nim}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jurusan" className="text-sm font-medium text-gray-700">
              Jurusan
            </Label>
            <Select 
              value={formData.jurusan} 
              onValueChange={(value) => handleInputChange("jurusan", value)}
            >
              <SelectTrigger className={`transition-all duration-200 ${errors.jurusan ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"}`}>
                <SelectValue placeholder="Pilih jurusan" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="Teknik Informatika">Teknik Informatika</SelectItem>
                <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                <SelectItem value="Teknik Elektro">Teknik Elektro</SelectItem>
              </SelectContent>
            </Select>
            {errors.jurusan && (
              <p className="text-sm text-red-500 mt-1">{errors.jurusan}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
            >
              {editingStudent ? "Perbarui" : "Simpan"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              {editingStudent ? "Batal" : "Reset"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
