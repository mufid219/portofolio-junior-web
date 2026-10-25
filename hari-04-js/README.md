# Pengolah Nilai Siswa

Dokumentasi ini hanya mencakup [`nilai.js`](./nilai.js), program terminal
interaktif untuk memasukkan nilai siswa dan melihat hasil pengolahannya.

## Persyaratan

- Node.js

Program menggunakan modul bawaan Node.js, jadi tidak perlu memasang dependensi
tambahan.

## Menjalankan

Dari folder `hari-04-js`, jalankan:

```bash
node nilai.js
```

## Menu Program

1. **Input nilai siswa** — memasukkan nama dan nilai siswa. Nama tidak boleh
   kosong dan nilai harus berupa angka dari 0 sampai 100.
2. **Tampilkan statistik** — menampilkan jumlah siswa, rata-rata, nilai
   tertinggi dan terendah, serta jumlah siswa lulus dan tidak lulus.
3. **Tampilkan predikat per siswa** — menampilkan siswa berdasarkan nilai
   tertinggi, beserta grade dan status kelulusan.
4. **Keluar** — menutup program.

Batas kelulusan adalah nilai 70. Grade ditentukan sebagai berikut:

- A: nilai 85–100
- B: nilai 70–84
- C: nilai 55–69
- D: nilai 0–54

Data hanya disimpan selama program berjalan dan tidak disimpan ke berkas.
