import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Home } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <Shield className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Akses Ditolak
        </h1>
        
        <p className="text-gray-600 mb-8">
          Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. 
          Silakan hubungi administrator jika Anda memerlukan akses.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="/login" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Login Ulang
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 