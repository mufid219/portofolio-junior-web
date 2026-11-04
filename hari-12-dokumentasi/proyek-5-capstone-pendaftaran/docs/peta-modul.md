# Peta Berkas dan Fungsi Publik

Dokumen ini memetakan seluruh berkas di `src/` dan `public/` beserta tanggung
jawab dan fungsi publik yang dideklarasikan. Fungsi PHP pada `src/` dideklarasikan
secara global. Berkas PHP di `public/` berperan sebagai endpoint atau template
dan tidak mendeklarasikan fungsi bernama.

## Direktori `src/`

| Berkas | Tanggung jawab | Fungsi publik |
|---|---|---|
| `src/bootstrap.php` | Memulai sesi, memuat konfigurasi, menetapkan pelaporan error, memuat koneksi database dan modul aplikasi, serta menangani exception yang tidak tertangani. | Tidak ada fungsi bernama. |
| `src/helpers.php` | Menyediakan helper untuk escaping output, redirect, token CSRF, pesan flash, dan pemeriksaan sesi admin. | `e(?string $teks): string`, `redirect(string $url): never`, `tokenCsrf(): string`, `cekCsrf(): void`, `setFlash(string $pesan): void`, `ambilFlash(): ?string`, `cekLoginAdmin(): void`. |
| `src/auth.php` | Menyediakan pencarian akun admin, proses autentikasi, pemeriksaan login, dan penghapusan sesi saat logout. | `cariAdmin(PDO $pdo, string $username): ?array`, `prosesLogin(PDO $pdo, string $username, string $sandi): bool`, `wajibLogin(): void`, `logout(): void`. |
| `src/pendaftar.php` | Menangani pembacaan data kelas dan pendaftar, validasi, operasi CRUD, pengambilan data admin/bukti, dan pemeriksaan kuota kelas. | `daftarKelas(PDO $pdo): array`, `hitungPendaftar(PDO $pdo, string $kata): int`, `ambilPendaftar(PDO $pdo, string $kata, int $batas, int $offset): array`, `ambilPendaftarById(PDO $pdo, int $id): ?array`, `emailSudahAda(PDO $pdo, string $email, ?int $kecualiId): bool`, `validasiPendaftar(array $input, PDO $pdo, ?int $idUbah): array`, `tambahPendaftar(PDO $pdo, array $d): bool`, `ubahPendaftar(PDO $pdo, int $id, array $d): bool`, `hapusPendaftar(PDO $pdo, int $id): bool`, `ambilAdminById(PDO $pdo, int $id): ?array`, `ambilSemuaPendaftar(PDO $pdo): array`, `ambilBuktiPendaftar(PDO $pdo, int $id): ?array`, `daftarkanDenganKuota(PDO $pdo, array $data): void`. Juga mendeklarasikan `KuotaPenuhException`, exception untuk kondisi kuota kelas penuh. |

## Direktori `public/`

| Berkas | Tanggung jawab | Fungsi publik |
|---|---|---|
| `public/index.php` | Menampilkan halaman utama untuk pengunjung. | Tidak ada fungsi bernama; skrip halaman. |
| `public/admin.php` | Memeriksa autentikasi admin dan menampilkan daftar pendaftar beserta tindakan administrasi. | Tidak ada fungsi bernama; endpoint halaman admin. |
| `public/login.php` | Menampilkan formulir login admin, memproses kredensial, dan menerapkan batas percobaan login. | Tidak ada fungsi bernama; endpoint login. |
| `public/logout.php` | Menghapus penanda login admin, menampilkan pesan flash, dan mengarahkan pengguna ke halaman login. | Tidak ada fungsi bernama; endpoint logout. |
| `public/tambah.php` | Menampilkan serta memproses formulir pendaftaran, termasuk validasi dan pemeriksaan kuota kelas. | Tidak ada fungsi bernama; endpoint pendaftaran. |
| `public/ubah.php` | Memeriksa login admin, memuat data pendaftar, dan memproses perubahan data. | Tidak ada fungsi bernama; endpoint ubah pendaftar. |
| `public/hapus.php` | Memeriksa login admin dan metode permintaan, memvalidasi CSRF, lalu menghapus pendaftar. | Tidak ada fungsi bernama; endpoint hapus pendaftar. |
| `public/cetak.php` | Mengambil data pendaftar dan menghasilkan bukti pendaftaran PDF menggunakan Dompdf. | Tidak ada fungsi bernama; endpoint cetak PDF. |
| `public/_form.php` | Menyediakan template bersama untuk formulir tambah dan ubah pendaftar. | Tidak ada fungsi bernama; template yang disertakan oleh endpoint. |
| `public/assets/js/app.js` | Menangani notifikasi flash, konfirmasi penghapusan, dan inisialisasi DataTables pada tabel pendaftar. | Tidak ada fungsi bernama yang diekspor; callback ditetapkan secara anonim pada event DOM dan form. |
