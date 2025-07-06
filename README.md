# Kampus Data Portal

Sistem manajemen data mahasiswa dengan fitur keamanan tingkat tinggi menggunakan Firebase Authentication dan Firestore.

## 🚀 Fitur Utama

### 🔐 Sistem Keamanan
- **Firebase Authentication**: Login/register dengan email dan password yang aman
- **Role-based Access Control**: Sistem role admin dan user
- **Password Reset**: Fitur reset password melalui email
- **Session Management**: Manajemen sesi yang aman dengan JWT token
- **Protected Routes**: Route protection dengan kontrol akses

### 📊 Manajemen Data
- **CRUD Mahasiswa**: Create, Read, Update, Delete data mahasiswa
- **Search & Filter**: Pencarian berdasarkan NIM, nama, jurusan, atau inisial
- **Real-time Updates**: Data terupdate secara real-time menggunakan Firestore
- **Responsive Design**: Interface yang responsif untuk desktop dan mobile

### 🎨 User Interface
- **Modern UI**: Menggunakan shadcn/ui components
- **Dark/Light Mode**: Tema yang dapat disesuaikan
- **Toast Notifications**: Notifikasi yang informatif
- **Loading States**: Indikator loading yang smooth

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **State Management**: React Hooks + Context
- **Routing**: React Router v6

## 📦 Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd kampus-data-portal
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
# atau
bun install
```

3. **Setup Firebase**
- Buat project Firebase baru
- Aktifkan Authentication (Email/Password)
- Aktifkan Firestore Database
- Update konfigurasi di `src/lib/firebase.ts`

4. **Run development server**
```bash
npm run dev
# atau
yarn dev
# atau
bun dev
```

## 🔧 Konfigurasi Firebase

### Authentication Setup
1. Buka Firebase Console
2. Pilih project Anda
3. Buka Authentication > Sign-in method
4. Aktifkan Email/Password provider
5. (Opsional) Aktifkan Email verification

### Firestore Setup
1. Buka Firestore Database
2. Buat database baru
3. Set security rules untuk production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Students collection - authenticated users can read/write
    match /students/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist folder ke Netlify
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 📁 Struktur Project

```
src/
├── components/          # React components
│   ├── ui/            # shadcn/ui components
│   ├── LoginForm.tsx  # Form login/register
│   ├── Navigation.tsx # Navigation bar
│   └── ...
├── hooks/             # Custom React hooks
│   ├── useAuth.ts     # Authentication hook
│   └── useStudents.ts # Students data hook
├── lib/               # Utilities
│   └── firebase.ts    # Firebase configuration
├── pages/             # Page components
│   ├── Index.tsx      # Main dashboard
│   ├── Login.tsx      # Login page
│   └── ...
└── docs/              # Documentation
    └── SecurityFeatures.md
```

## 🔐 Keamanan

### Fitur Keamanan yang Diimplementasikan
- ✅ Password hashing & salting (Firebase)
- ✅ JWT token-based sessions
- ✅ Rate limiting untuk login attempts
- ✅ Input validation & sanitization
- ✅ Role-based access control
- ✅ Protected routes
- ✅ Secure error handling
- ✅ HTTPS enforcement

### Best Practices
- Password minimal 6 karakter
- Email validation
- Session timeout
- Secure logout
- Audit logging

## 📝 Penggunaan

### Login
1. Buka aplikasi di browser
2. Masukkan email dan password
3. Klik "Masuk"
4. Setelah berhasil, Anda akan diarahkan ke dashboard

### Register (Fitur Baru)
1. Klik tab "Daftar" di halaman login
2. Isi form dengan email, username, dan password
3. Klik "Daftar"
4. Verifikasi email (opsional)
5. Login dengan akun baru

### Reset Password
1. Klik tab "Reset" di halaman login
2. Masukkan email yang terdaftar
3. Klik "Kirim Reset Password"
4. Cek email untuk link reset password

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Note**: Pastikan untuk mengupdate Firebase configuration dengan project Anda sendiri sebelum deployment.
