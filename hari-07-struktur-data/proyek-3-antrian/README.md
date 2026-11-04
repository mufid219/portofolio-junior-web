# Antrean Loket dan Text Editor

Proyek ini adalah aplikasi browser untuk mengelola antrean loket dan mencoba
fitur Undo/Redo pada editor teks. Implementasinya menggunakan struktur data
queue dan stack yang dibuat sendiri.

## Menjalankan

Aplikasi menggunakan JavaScript ES module. Jalankan server web lokal dari
folder `proyek-3-antrian`, misalnya:

```bash
python3 -m http.server 8000
```

Buka `http://localhost:8000/` di browser.

## Fitur

### Antrean Loket

- **Ambil Nomor** menambahkan nomor antrean berurutan dengan awalan `A`
  (contoh: `A001`).
- **Panggil Berikutnya** memanggil nomor terdepan dalam antrean.
- Menampilkan jumlah dan daftar nomor yang masih menunggu.
- Menampilkan hingga lima nomor terakhir yang telah dipanggil.
- **Reset Antrean** mengosongkan antrean, riwayat, dan urutan nomor setelah
  konfirmasi.
- Nomor terakhir disimpan di `localStorage` dan urutannya dimulai kembali
  setiap hari. Antrean yang sedang menunggu dan riwayat panggilan hanya tersimpan
  selama halaman terbuka.

### Text Editor (Undo / Redo)

- Menyimpan perubahan teks sebagai sesi setelah jeda input 500 ms.
- **Undo** dan **Redo** berpindah di antara perubahan yang tersimpan.
- Riwayat dibatasi hingga 50 sesi undo.
- Isi editor dan riwayat tidak disimpan setelah halaman ditutup atau dimuat ulang.

## Struktur Berkas

- `index.html` — elemen halaman untuk antrean dan editor.
- `js/app.js` — menghubungkan elemen halaman dengan modul fitur.
- `js/antrian.js` — logika antrean loket dan penyimpanan nomor.
- `js/riwayat.js` — logika editor serta Undo/Redo.
- `js/structures.js` — implementasi struktur data `Queue`, `Stack`,
  `LinkedList`, `LinkedQueue`, dan `BinarySearchTree`.

Antrean loket menggunakan `Queue` untuk melayani nomor berdasarkan urutan
kedatangan, sedangkan riwayat panggilan dan Undo/Redo menggunakan `Stack`.
