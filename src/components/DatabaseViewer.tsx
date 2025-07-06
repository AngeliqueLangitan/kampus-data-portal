import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database, Users } from "lucide-react";

interface Student {
  id: string;
  nama: string;
  nim: string;
  jurusan: string;
}

const DatabaseViewer = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Student[];
      
      setStudents(studentsData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();

    // Real-time listener
    const unsubscribe = onSnapshot(collection(db, "students"), (snapshot) => {
      const studentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Student[];
      
      setStudents(studentsData);
      setLastUpdated(new Date());
    });

    return () => unsubscribe();
  }, []);

  const getJurusanBadge = (jurusan: string) => {
    const colorMap = {
      "Teknik Informatika": "bg-blue-100 text-blue-800 border-blue-200",
      "Sistem Informasi": "bg-green-100 text-green-800 border-green-200",
      "Teknik Elektro": "bg-purple-100 text-purple-800 border-purple-200",
    };
    return colorMap[jurusan as keyof typeof colorMap] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Firebase Database Viewer
            </CardTitle>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Melihat data langsung dari Firebase Firestore
              </p>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchStudents}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                {lastUpdated && (
                  <span className="text-xs text-gray-500">
                    Terakhir update: {lastUpdated.toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Data Mahasiswa di Firebase
              <Badge variant="secondary" className="ml-auto">
                {students.length} mahasiswa
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat data dari Firebase...</p>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-8">
                <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium mb-2">
                  Belum ada data mahasiswa di Firebase
                </p>
                <p className="text-gray-400">
                  Tambahkan data mahasiswa melalui aplikasi untuk melihat data di sini
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{student.nama}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="font-mono">{student.nim}</span>
                          <Badge 
                            variant="outline" 
                            className={getJurusanBadge(student.jurusan)}
                          >
                            {student.jurusan}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        ID: {student.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informasi Firebase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Project ID:</span>
                <span className="font-mono">crud-sederhana-3a4db</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Database:</span>
                <span className="font-mono">Firestore</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Collection:</span>
                <span className="font-mono">students</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Connected
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseViewer; 