# Proyek 4: Buku Tamu

Aplikasi buku tamu sederhana berbasis PHP. Pengunjung dapat mengirim pesan dan melihat pesan yang sudah masuk. Data disimpan dalam berkas JSON, sehingga aplikasi ini tidak memerlukan database.

## Fitur

- Formulir buku tamu dengan validasi nama, email, dan pesan.
- Pembatasan pengiriman satu pesan per alamat IP setiap 30 detik.
- Daftar pesan terbaru, pencarian berdasarkan nama, dan paginasi lima pesan per halaman.
- Panel admin untuk melihat dan menghapus pesan serta mengekspor data ke CSV.
- Penyimpanan data pada `data/tamu.json` dan informasi pembatasan pengiriman pada `data/ratelimit.json`.

## Persyaratan

- PHP 7.4 atau lebih baru.
- Ekstensi PHP `mbstring`.
- Web server PHP (misalnya Apache melalui XAMPP) atau PHP CLI untuk server pengembangan.
- Direktori `data/` harus dapat ditulisi oleh proses PHP.

Tidak diperlukan instalasi paket atau konfigurasi database.

## Menjalankan aplikasi

### Dengan XAMPP

1. Pastikan folder proyek berada di dalam direktori web server XAMPP, misalnya `htdocs`.
2. Jalankan Apache dari XAMPP.
3. Buka `http://localhost/portofolio-junior-web/hari-08-php/proyek-4-buku-tamu/` di browser. Sesuaikan URL jika nama atau lokasi folder berbeda.

### Dengan server pengembangan PHP

Dari direktori proyek, jalankan:

```bash
php -S localhost:8000
```

Kemudian buka `http://localhost:8000/`.

## Penggunaan

- Halaman utama: `/` atau `index.php`.
- Panel admin: `admin.php`.
- Untuk mengekspor data, pilih tautan **Ekspor ke CSV** pada panel admin.
- Jika berkas data belum tersedia, aplikasi akan menampilkan daftar kosong dan membuat berkas yang diperlukan saat data pertama kali disimpan.

Validasi formulir mensyaratkan nama minimal 3 karakter, format email yang valid, serta pesan sepanjang 1–500 karakter. Setelah pesan berhasil dikirim, pengunjung perlu menunggu 30 detik sebelum dapat mengirim pesan lain dari alamat IP yang sama.

## Struktur berkas

```text
proyek-4-buku-tamu/
├── admin.php             # Panel admin, penghapusan pesan, dan ekspor CSV
├── functions.php         # Validasi, penyimpanan, pencarian, dan fungsi bersama
├── index.php             # Formulir dan daftar pesan untuk pengunjung
└── data/
    ├── .htaccess         # Mencegah akses HTTP langsung ke berkas data
    ├── ratelimit.json    # Catatan pembatasan pengiriman
    └── tamu.json         # Data pesan buku tamu
```

## Catatan keamanan

Panel admin saat ini belum menggunakan autentikasi. Batasi akses ke `admin.php` sebelum aplikasi dipasang di server yang dapat diakses publik. Aturan `.htaccess` melindungi direktori `data/` pada Apache; pastikan konfigurasi web server yang digunakan menerapkan aturan tersebut.
