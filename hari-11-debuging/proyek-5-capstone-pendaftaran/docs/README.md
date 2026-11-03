# Proyek Capstone: Pendaftaran Pelatihan

Aplikasi PHP sederhana untuk mengelola pendaftaran peserta pelatihan. Proyek ini menggunakan MySQL, Bootstrap, dan Dompdf. Evaluasi library yang lebih lengkap tersedia di [daftar-library.md](./daftar-library.md).

## Fitur

- Formulir pendaftaran dengan validasi data dan pemeriksaan email duplikat.
- Pengelolaan data pendaftar melalui halaman admin: daftar, ubah, dan hapus.
- Pencarian dan penyajian tabel menggunakan DataTables.
- Pembuatan bukti pendaftaran dalam format PDF.
- Proteksi CSRF pada formulir yang mengirimkan data.
- Halaman demonstrasi perbandingan query SQL yang tidak aman dan prepared statement di `injeksi.php`.

> **Catatan:** Proyek ini masih berupa aplikasi pembelajaran. Login admin menggunakan kata sandi demo `admin123` yang ditetapkan langsung di kode, bukan autentikasi dari tabel `admin`. Ganti mekanisme login tersebut sebelum aplikasi digunakan di lingkungan nyata. Jangan publikasikan `injeksi.php` ke server yang dapat diakses umum.

## Teknologi

- PHP 8.x dengan PDO dan MySQL
- [Dompdf](https://github.com/dompdf/dompdf) untuk membuat PDF
- Bootstrap, jQuery, DataTables, dan SweetAlert2 (aset frontend dimuat dari CDN)

FPDF tercantum dalam evaluasi library, tetapi belum menjadi dependensi aplikasi.

## Persyaratan

- PHP yang didukung oleh Dompdf 3.1, dengan ekstensi `PDO`, `pdo_mysql`, dan `mbstring`
- MySQL atau MariaDB
- Composer
- Web server lokal seperti Apache (misalnya XAMPP atau LAMPP)
- Koneksi internet untuk memuat aset frontend dari CDN

## Instalasi lokal

1. Tempatkan folder proyek di direktori web server lokal, lalu buka terminal pada direktori proyek `proyek-5-capstone-pendaftaran`.
2. Pasang dependensi PHP:

   ```bash
   composer install
   ```

3. Buat database MySQL bernama `db_pelatihan`.
4. Buat tabel `kelas` terlebih dahulu. Tabel ini diperlukan oleh relasi di `database/skema.sql`, tetapi belum disertakan dalam berkas skema:

   ```sql
   CREATE TABLE kelas (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nama_kelas VARCHAR(100) NOT NULL
   ) ENGINE=InnoDB;

   INSERT INTO kelas (nama_kelas)
   VALUES ('Kelas Pemrograman Web');
   ```

5. Impor `database/skema.sql` ke database tersebut untuk membuat tabel `pendaftar` dan `admin`.
6. Salin `config/config.contoh.php` menjadi `config/config.php`, lalu sesuaikan host, nama database, nama pengguna, kata sandi, dan opsi `debug`. Jangan unggah `config.php` ke repositori.
7. Arahkan document root Apache ke folder `public`, atau akses folder tersebut melalui URL lokal. Jika folder proyek berada di `htdocs/hari-10-library`, URL-nya:

   ```text
   http://localhost/hari-10-library/proyek-5-capstone-pendaftaran/public/
   ```

   Sesuaikan URL dengan lokasi folder proyek di mesin Anda.

## Penggunaan

- Pengunjung membuka halaman utama lalu menggunakan menu **Tambah** untuk mendaftarkan peserta.
- Admin membuka **Login Admin**. Untuk versi demo saat ini, kata sandinya adalah `admin123`.
- Setelah login, halaman admin menyediakan daftar peserta serta tindakan ubah, hapus, dan cetak bukti PDF.

## Struktur direktori

```text
config/       Konfigurasi aplikasi dan koneksi database
database/     Skema database
docs/         Dokumentasi proyek dan evaluasi library
public/       Halaman yang diakses melalui web server
src/          Fungsi aplikasi, validasi, dan inisialisasi
templates/    Template halaman dan bukti pendaftaran PDF
```

## Dokumen terkait

- [Evaluasi library](./daftar-library.md)
- [Skema database](../database/skema.sql)
