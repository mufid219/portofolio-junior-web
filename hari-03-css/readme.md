# Website Sederhana

## 1. Deskripsi Website

Website ini merupakan proyek sederhana untuk mempelajari dasar-dasar HTML, struktur folder, dan navigasi antar halaman web. Website terdiri dari beberapa halaman HTML, folder gaya CSS, aset gambar, serta halaman blog.

Navigasi website dirancang agar seluruh halaman hanya dapat diakses melalui halaman utama (index.html).

## 2. Struktur File

proyek-1-landingpage/
├── index.html
├── daftar.html
├── jadwal.html
├── kontak.html
├── profil.html
├── tentang.html
├── css/
│   └── style.css
├── img/
│   └── IMG_9586 merah 3r.jpg
├── blog/
│   └── artikel-1.html
└── README.md


Keterangan:

index.html: Halaman utama website yang berisi menu navigasi menuju halaman lainnya.

daftar.html: Halaman pendaftaran.

jadwal.html: Halaman informasi jadwal.

kontak.html: Halaman yang berisi informasi kontak.

profil.html: Halaman profil.

tentang.html: Halaman yang menjelaskan profil atau informasi tentang website.

css/: Folder yang berisi file CSS (style.css).

img/: Folder yang berisi aset gambar (IMG_9586 merah 3r.jpg).

blog/: Folder yang berisi file artikel (artikel-1.html).

README.md: Dokumen petunjuk penggunaan website.

## 3. Petunjuk Menjalankan Website

Unduh atau salin seluruh file website ke dalam satu folder.

Pastikan semua file dan folder berada dalam struktur yang sesuai.

Buka file index.html menggunakan browser, seperti Google Chrome atau Microsoft Edge.

Gunakan tautan navigasi pada halaman utama untuk membuka halaman lainnya.

Untuk kembali ke halaman utama, gunakan tombol kembali (Back) pada browser.

## 4. Aturan Navigasi

Website menggunakan ketentuan navigasi berikut:

Halaman index.html memiliki tautan menuju halaman lainnya (daftar.html, jadwal.html, kontak.html, profil.html, tentang.html, dan blog/artikel-1.html).

Halaman lainnya tidak memiliki tautan menuju halaman lain.

Dengan demikian, navigasi antar halaman hanya disediakan melalui halaman utama.

## 5. Contoh Kode Navigasi pada index.html

<nav>
    <ul>
        <li><a href="index.html">Beranda</a></li>
        <li><a href="daftar.html">Daftar</a></li>
        <li><a href="jadwal.html">Jadwal</a></li>
        <li><a href="kontak.html">Kontak</a></li>
        <li><a href="profil.html">Profil</a></li>
        <li><a href="tentang.html">Tentang</a></li>
        <li><a href="blog/artikel-1.html">Artikel 1</a></li>
    </ul>
</nav>


Kode tersebut membuat tautan navigasi pada halaman utama. Tautan Beranda membuka index.html, sedangkan tautan lainnya membuka halaman sesuai lokasi file masing-masing.

## 6. Catatan

Penulisan nama file pada atribut href harus sesuai dengan lokasi dan nama file yang tersedia.

Semua file sebaiknya disimpan dalam struktur folder yang sesuai agar tautan relatif dapat berfungsi dengan benar.

Website dapat dijalankan langsung melalui browser tanpa server tambahan karena masih berupa website HTML statis.

Jika website dikembangkan lebih lanjut, CSS dapat ditambahkan untuk mempercantik tampilan dan JavaScript dapat digunakan untuk menambahkan interaksi.

## 7. Tujuan Pembelajaran

Melalui proyek ini, pengguna diharapkan mampu:

Memahami struktur dasar dokumen HTML.

Membuat beberapa halaman HTML dalam struktur folder.

Menggunakan elemen tautan (<a>) untuk navigasi antar halaman dan folder.

Memahami penggunaan atribut href dan tautan relatif.

Menguji navigasi website melalui browser.