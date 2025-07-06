# Getting Started - Kampus Data Portal

## 🚀 Cara Menjalankan Aplikasi

### 1. Development Server
```bash
npm run dev
```

Server akan berjalan di: **http://localhost:8083**

### 2. Build untuk Production
```bash
npm run build
```

### 3. Preview Production Build
```bash
npm run preview
```

## 🔐 Sistem Login Baru

### Fitur Keamanan
- ✅ Firebase Authentication
- ✅ Email/Password login
- ✅ User registration
- ✅ Password reset
- ✅ Role-based access control
- ✅ Secure session management

### Cara Login
1. Buka **http://localhost:8083**
2. Anda akan diarahkan ke halaman login
3. Pilih tab yang sesuai:
   - **Login**: Masuk dengan email dan password
   - **Daftar**: Buat akun baru
   - **Reset**: Reset password melalui email

### Demo Credentials (Untuk Testing)
Untuk testing, Anda bisa:
1. **Register** akun baru dengan email dan password
2. **Login** dengan akun yang sudah dibuat
3. **Reset password** jika lupa password

## 📱 Fitur Aplikasi

### Dashboard
- Manajemen data mahasiswa
- Search dan filter data
- CRUD operations
- Real-time updates

### User Management
- User profile dengan avatar
- Role management (admin/user)
- Session management
- Secure logout

## 🛠️ Troubleshooting

### Jika "Site can't be reached"
1. Pastikan server berjalan: `npm run dev`
2. Cek port yang digunakan (biasanya 8083)
3. Buka browser dan akses: `http://localhost:8083`

### Jika ada error Firebase
1. Pastikan Firebase project sudah dikonfigurasi
2. Cek file `src/lib/firebase.ts`
3. Pastikan Authentication dan Firestore sudah diaktifkan

### Jika ada error TypeScript
1. Restart development server
2. Clear cache: `npm run clean`
3. Reinstall dependencies: `npm install`

## 📞 Support

Jika ada masalah, silakan:
1. Cek console browser untuk error
2. Cek terminal untuk error server
3. Pastikan semua dependencies terinstall
4. Restart development server

---

**Note**: Aplikasi sekarang menggunakan sistem keamanan yang lebih baik dengan Firebase Authentication. Pastikan Firebase project sudah dikonfigurasi dengan benar. 