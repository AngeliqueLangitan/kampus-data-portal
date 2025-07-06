
# Konfigurasi Firebase

## Langkah-langkah untuk menghubungkan ke Firebase:

1. **Buat Proyek Firebase:**
   - Buka [Firebase Console](https://console.firebase.google.com/)
   - Klik "Add project" atau "Tambah proyek"
   - Ikuti langkah-langkah untuk membuat proyek baru

2. **Aktifkan Firestore Database:**
   - Di Firebase Console, pilih proyek Anda
   - Klik "Firestore Database" di sidebar
   - Klik "Create database"
   - Pilih mode "Start in test mode" untuk development

3. **Dapatkan Konfigurasi Firebase:**
   - Di Firebase Console, klik ikon gear (Settings)
   - Pilih "Project settings"
   - Scroll ke bawah ke section "Your apps"
   - Klik ikon web (</>) untuk "Add Firebase to your web app"
   - Copy konfigurasi yang diberikan

4. **Update Konfigurasi:**
   - Buka file `src/lib/firebase.ts`
   - Ganti konfigurasi placeholder dengan konfigurasi Firebase Anda

5. **Aturan Firestore (Opsional untuk Production):**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /students/{document} {
         allow read, write: if true; // Untuk development
         // Untuk production, implementasikan aturan keamanan yang sesuai
       }
     }
   }
   ```

## Struktur Data di Firestore:

Collection: `students`
Document fields:
- `nama` (string): Nama lengkap mahasiswa
- `nim` (string): Nomor Induk Mahasiswa
- `jurusan` (string): Jurusan mahasiswa

## Fitur yang Telah Diimplementasi:

- ✅ Real-time updates menggunakan onSnapshot
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Error handling dengan toast notifications
- ✅ Loading states
- ✅ Automatic data synchronization

Aplikasi akan secara otomatis menyinkronkan data antar semua client yang terhubung berkat fitur real-time Firestore.
