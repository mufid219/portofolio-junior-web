# Evaluasi & Pemilihan Library Proyek

Dokumen ini berisi hasil evaluasi teknis terhadap _library_ dan _framework_ yang akan digunakan dalam pengembangan proyek. Evaluasi ini mencakup aspek kesesuaian kebutuhan, perizinan (lisensi), status pemeliharaan, popularitas komunitas, serta kompatibilitas sistem.

---

## Daftar Library yang Dievaluasi

1. **Bootstrap** (Frontend UI Framework)
2. **SweetAlert2 11** (UI Notification / Modal)
3. **jQuery 3.7** (JavaScript DOM Manipulation & AJAX)
4. **DataTables 1.13** (Advanced Table Plugin)
5. **Dompdf** (PHP HTML-to-PDF Renderer)
6. **FPDF** (PHP PDF Generation Library)

---

## Matriks Evaluasi Kriteria

### 1. Bootstrap

- **Kesesuaian Kebutuhan:** Menyediakan komponen UI siap pakai (tombol, _modal_, _grid system_, form) yang mempercepat pengembangan antarmuka responsif tanpa harus mendesain dari awal.
- **Lisensi:** MIT License (Sangat ramah untuk proyek komersial maupun open-source).
- **Pemeliharaan:** Aktif dikembangkan secara berkala oleh komunitas global; rilis stabil terbaru (Bootstrap 5.3+ / pembaruan rutin pada versi utama). Isu terbuka dikelola dengan baik di GitHub.
- **Popularitas & Komunitas:** Sangat populer (ratusan ribu bintang di GitHub, dokumentasi sangat lengkap, banyak contoh kasus di StackOverflow).
- **Kompatibilitas:** Mendukung seluruh _browser_ modern (Chrome, Firefox, Safari, Edge). Memiliki potensi konflik kecil dengan CSS kustom jika tidak menggunakan penamaan kelas yang spesifik.

### 2. SweetAlert2 (v11)

- **Kesesuaian Kebutuhan:** Pengganti dialog _alert_ bawaan browser (`alert`, `confirm`, `prompt`) yang interaktif, dapat dikustomisasi dengan mudah, dan mendukung HTML di dalamnya.
- **Lisensi:** MIT License.
- **Pemeliharaan:** Pemeliharaan sangat aktif, _bug fix_ dan pembaruan keamanan rutin dilakukan. Isu terbuka cepat ditanggapi oleh _maintainer_.
- **Popularitas & Komunitas:** Standar industri untuk _popup/notification_ berbasis web, dokumentasi sangat interaktif dan jelas.
- **Kompatibilitas:** Kompatibel dengan semua _browser_ modern dan mudah diintegrasikan bersama _framework_ CSS seperti Bootstrap.

### 3. jQuery (v3.7)

- **Kesesuaian Kebutuhan:** Menyederhanakan manipulasi DOM, penanganan _event_, dan _AJAX requests_. Sangat diperlukan karena menjadi dependensi utama _plugin_ seperti DataTables 1.13.
- **Lisensi:** MIT License.
- **Pemeliharaan:** Status stabil jangka panjang. Pembaruan berfokus pada perbaikan keamanan dan kompatibilitas _browser_ terbaru.
- **Popularitas & Komunitas:** Salah satu _library_ JavaScript paling banyak digunakan sepanjang sejarah; dokumentasi melimpah meskipun mulai bergeser ke Vanilla JS pada proyek modern tertentu.
- **Kompatibilitas:** Versi 3.x meninggalkan dukungan untuk Internet Explorer lama demi performa yang lebih baik di _browser_ modern.

### 4. DataTables (v1.13)

- **Kesesuaian Kebutuhan:** Menambahkan fitur interaktif tingkat lanjut pada tabel HTML standar (seperti _paging_, _instant search_, _sorting_ multi-kolom, dan _responsiveness_).
- **Lisensi:** MIT License.
- **Pemeliharaan:** Pemeliharaan aktif (transisi bertahap ke versi 2.x, namun versi 1.13 tetap sangat stabil dan banyak digunakan).
- **Popularitas & Komunitas:** Plugin tabel data terpopuler di ekosistem web berbasis jQuery dengan ekstensi yang sangat kaya (Buttons, FixedHeader, Responsive).
- **Kompatibilitas:** Memerlukan jQuery dan kompatibel dengan berbagai _framework_ CSS (Bootstrap, Foundation, Tailwind).

### 5. Dompdf

- **Kesesuaian Kebutuhan:** Digunakan untuk mencetak laporan atau dokumen langsung dari kode HTML & CSS sisi server (Backend PHP) menjadi file PDF.
- **Lisensi:** LGPL v3.0 (Memungkinkan penggunaan komersial dengan batasan tertentu terkait modifikasi _library_ aslinya).
- **Pemeliharaan:** Cukup aktif, pembaruan rutin untuk mendukung standar CSS baru dan perbaikan celah keamanan (CVE).
- **Popularitas & Komunitas:** Pilihan utama pengembang PHP untuk pembuatan PDF berbasis HTML. Dokumentasi dan panduan pemecahan masalah (troubleshooting) luas di internet.
- **Kompatibilitas:** Membutuhkan PHP versi yang kompatibel (PHP 7.4 / 8.x tergantung versi Dompdf), serta ekstensi PHP seperti GD dan MBString. Keterbatasan pada tata letak CSS yang kompleks (Flexbox/Grid mungkin tidak didukung penuh).

### 6. FPDF

- **Kesesuaian Kebutuhan:** Alternatif murni berbasis skrip PHP untuk membuat dokumen PDF secara _low-level_ (mengatur posisi koordinat X, Y secara manual per baris/kotak).
- **Lisensi:** Permissive License (Gratis untuk penggunaan komersial maupun personal tanpa restribusi lisensi ketat).
- **Pemeliharaan:** Relatif jarang ada perubahan besar karena sifatnya yang _lightweight_ dan sudah matang (_mature_).
- **Popularitas & Komunitas:** Klasik dan sangat efisien untuk dokumen sederhana dengan performa tinggi, meskipun dokumentasinya bergaya lama.
- **Kompatibilitas:** Mendukung berbagai versi PHP (termasuk PHP 8 dengan penyesuaian kecil jika menggunakan _script_ pihak ketiga) dan tidak membutuhkan _dependency_ eksternal yang rumit.

---

## Kesimpulan & Rekomendasi

- **Sisi Frontend:** Kombinasi **Bootstrap**, **jQuery 3.7**, **SweetAlert2**, dan **DataTables 1.13** sangat sinkron dan ideal untuk membangun aplikasi web dashboard/admin yang interaktif dan cepat.
- **Sisi Backend (PDF):** Gunakan **Dompdf** jika struktur dokumen berbasis HTML/CSS yang kompleks diperlukan. Gunakan **FPDF** jika prioritas utama adalah performa tinggi pada dokumen berformat kaku dengan posisi koordinat pasti.
