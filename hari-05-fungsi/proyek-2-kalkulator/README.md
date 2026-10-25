# Kalkulator dan Validasi Formulir

Folder ini berisi dua latihan JavaScript berbasis browser: kalkulator aritmetika
dan formulir pendaftaran dengan validasi.

## Kalkulator

Buka `kalkulator/index.html` untuk menggunakan kalkulator. Operasi yang tersedia:

- Penjumlahan (`+`)
- Pengurangan (`-`)
- Perkalian (`×`)
- Pembagian (`/`)
- Desimal, hapus input (`C`), dan hitung hasil (`=`)

Logika operasi berada di `kalkulator/js/operasi.js`, sedangkan
`kalkulator/js/app.js` menangani tombol dan tampilan kalkulator. Pembagian
dengan nol dan operator yang tidak dikenal menghasilkan error.

## Validasi Formulir

Buka `validator/index.html` untuk mencoba formulir pendaftaran. Formulir
memvalidasi:

- Nama minimal 3 karakter.
- Format alamat email.
- Nomor HP yang diawali `08` dengan total 10–13 digit.
- Sandi minimal 8 karakter yang berisi huruf dan angka.
- Konfirmasi sandi yang sama dengan sandi.

Aturan validasi berada di `validator/js/aturan.js`, sementara
`validator/js/app.js` menampilkan pesan kesalahan dan ringkasan pendaftaran
setelah semua isian valid. Data tidak dikirim ke server.

## Menjalankan

Kedua aplikasi menggunakan JavaScript ES module. Jalankan server web lokal dari
folder `proyek-2-kalkulator`, misalnya:

```bash
python3 -m http.server 8000
```

Kemudian buka salah satu alamat berikut di browser:

- `http://localhost:8000/kalkulator/`
- `http://localhost:8000/validator/`
