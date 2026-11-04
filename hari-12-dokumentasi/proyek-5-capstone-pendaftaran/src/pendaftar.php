<?php

declare(strict_types=1);

/**
 * Mengambil daftar seluruh kelas yang tersedia diurutkan berdasarkan nama kelas.
 *
 * @param PDO $pdo Koneksi database aktif.
 * 
 * @return array<int, array<string, mixed>> Daftar baris kelas.
 */
function daftarKelas(PDO $pdo): array
{
    return $pdo->query('SELECT id, nama_kelas FROM kelas ORDER BY
nama_kelas')->fetchAll();
}


/**
 * Memvalidasi masukan form pendaftar dan mengembalikan data bersih serta galat.
 *
 * @param array<string, mixed> $input Data mentah (biasanya $_POST).
 * @param PDO $pdo Koneksi untuk memeriksa email ganda dan
kelas.
 * @param int|null $idUbah ID pendaftar yang sedang diubah, null saat
menambah.
 *
 * @return array{data: array<string, mixed>, galat: array<string, string>}
 * `galat` kosong bila seluruh masukan valid.
 */
function hitungPendaftar(PDO $pdo, string $kata): int
{
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE nama LIKE :kata');
    $stmt->execute(['kata' => '%' . $kata . '%']);
    return (int) $stmt->fetchColumn();
}


/**
 * Mengambil satu pendaftar berdasarkan ID.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id ID pendaftar (minimal 1).
 *
 * @return array<string, mixed>|null Baris pendaftar, atau null bila tidak ditemukan.
 */
function ambilPendaftar(PDO $pdo, string $kata, int $batas, int $offset): array
{
    $sql = 'SELECT p.id, p.nama, p.email, p.no_hp, k.nama_kelas

FROM pendaftar p JOIN kelas k ON k.id = p.kelas_id
WHERE p.nama LIKE :kata
ORDER BY p.id DESC LIMIT :batas OFFSET :offset';
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':kata', '%' . $kata . '%');
    $stmt->bindValue(':batas', $batas, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll();
}

/**
 * Mengambil satu data pendaftar berdasarkan ID uniknya.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id ID pendaftar yang dicari.
 * 
 * @return array<string, mixed>|null Baris pendaftar, atau null jika tidak ditemukan.
 */
function ambilPendaftarById(PDO $pdo, int $id): ?array
{
    $stmt = $pdo->prepare('SELECT * FROM pendaftar WHERE id = :id');
    $stmt->execute(['id' => $id]);
    $baris = $stmt->fetch();
    return $baris === false ? null : $baris;
}

/**
 * Memeriksa apakah alamat email sudah terdaftar, dengan opsi mengabaikan ID tertentu (misalnya saat mengubah data).
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param string $email Alamat email yang ingin diperiksa.
 * @param int|null $kecualiId ID pendaftar yang dikecualikan dari pengecekan, atau null.
 * 
 * @return bool True jika email sudah ada, false jika belum.
 */
function emailSudahAda(PDO $pdo, string $email, ?int $kecualiId): bool
{
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE email = :email AND id
<> :id');
    $stmt->execute(['email' => $email, 'id' => $kecualiId ?? 0]);
    return (int) $stmt->fetchColumn() > 0;
}

/**
 * Memvalidasi masukan form pendaftar dan mengembalikan data bersih serta galat.
 *
 * @param array<string, mixed> $input Data mentah masukan form (biasanya $_POST).
 * @param PDO $pdo Koneksi database untuk memeriksa email ganda dan kelas.
 * @param int|null $idUbah ID pendaftar yang sedang diubah, atau null saat menambah baru.
 * 
 * @return array{data: array<string, mixed>, galat: array<string, string>}
 * `galat` kosong bila seluruh masukan valid.
 */
function validasiPendaftar(array $input, PDO $pdo, ?int $idUbah): array
{
    $data = [
        'nama' => trim((string) ($input['nama'] ?? '')),
        'email' => strtolower(trim((string) ($input['email'] ?? ''))),
        'no_hp' => trim((string) ($input['no_hp'] ?? '')),
        'alamat' => trim((string) ($input['alamat'] ?? '')),
        'kelas_id' => (int) ($input['kelas_id'] ?? 0),
    ];
    $galat = [];
    if (mb_strlen($data['nama']) < 3) {
        $galat['nama'] = 'Nama minimal 3 karakter.';
    }
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $galat['email'] = 'Format email tidak valid.';
    } elseif (emailSudahAda($pdo, $data['email'], $idUbah)) {
        $galat['email'] = 'Email sudah terdaftar.';
    }
    if (!preg_match('/^08[0-9]{8,11}$/', $data['no_hp'])) {
        $galat['no_hp'] = 'Nomor HP diawali 08 dan 10-13 digit.';
    }
    if (!in_array($data['kelas_id'], array_column(daftarKelas($pdo), 'id'), true)) {
        $galat['kelas_id'] = 'Pilih kelas yang tersedia.';
    }

    return ['data' => $data, 'galat' => $galat];
}

/**
 * Menambahkan data pendaftar baru ke dalam database.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param array<string, mixed> $d Data pendaftar yang sudah divalidasi dan bersih.
 * 
 * @return bool True jika berhasil, false jika gagal.
 */
function tambahPendaftar(PDO $pdo, array $d): bool
{
    $sql = 'INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
VALUES (:nama, :email, :no_hp, :alamat, :kelas_id)';
    return $pdo->prepare($sql)->execute($d);
}

/**
 * Memperbarui data pendaftar yang sudah ada berdasarkan ID.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id ID pendaftar yang akan diubah.
 * @param array<string, mixed> $d Data baru pendaftar yang sudah dibersihkan.
 * 
 * @return bool True jika berhasil, false jika gagal.
 */
function ubahPendaftar(PDO $pdo, int $id, array $d): bool
{
    $sql = 'UPDATE pendaftar SET nama = :nama, email = :email, no_hp = :no_hp,
alamat = :alamat, kelas_id = :kelas_id WHERE id = :id';
    return $pdo->prepare($sql)->execute($d + ['id' => $id]);
}

/**
 * Menghapus data pendaftar dari database berdasarkan ID.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id ID pendaftar yang akan dihapus.
 * 
 * @return bool True jika berhasil, false jika gagal.
 */
function hapusPendaftar(PDO $pdo, int $id): bool
{
    return $pdo->prepare('DELETE FROM pendaftar WHERE id = :id')->execute(['id' =>
    $id]);
}

/**
 * Mengambil satu data admin berdasarkan ID uniknya.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id ID admin yang dicari.
 * 
 * @return array<string, mixed>|null Baris data admin, atau null bila tidak ditemukan.
 */
function ambilAdminById(PDO $pdo, int $id): ?array
{
    $stmt = $pdo->prepare('SELECT * FROM admin WHERE id = :id');
    $stmt->execute(['id' => $id]);
    $baris = $stmt->fetch();
    return $baris === false ? null : $baris;
}

/**
 * Mengambil seluruh data pendaftar beserta informasi kelasnya, diurutkan dari ID terbesar (terbaru).
 *
 * @param PDO $pdo Koneksi database aktif.
 * 
 * @return array<int, array<string, mixed>> Daftar seluruh pendaftar.
 */
function ambilSemuaPendaftar(PDO $pdo): array
{
    $sql = 'SELECT p.id, p.nama, p.email, p.no_hp, p.tgl_daftar, k.nama_kelas
FROM pendaftar p JOIN kelas k ON k.id = p.kelas_id
ORDER BY p.id DESC';
    return $pdo->query($sql)->fetchAll();
}

/**
 * Mengambil detail bukti pendaftar tertentu berdasarkan ID untuk keperluan cetak/tampil bukti.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id ID pendaftar.
 * 
 * @return array<string, mixed>|null Data bukti pendaftar, atau null bila tidak ditemukan.
 */
function ambilBuktiPendaftar(PDO $pdo, int $id): ?array
{
    $sql = 'SELECT p.id, p.nama, p.email, p.no_hp, p.tgl_daftar, k.nama_kelas
FROM pendaftar p JOIN kelas k ON k.id = p.kelas_id
WHERE p.id = :id';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);
    $baris = $stmt->fetch();

    return $baris === false ? null : $baris;
}

final class KuotaPenuhException extends RuntimeException {}

/**
 * Mendaftarkan pendaftar dengan memeriksa ketersediaan kuota kelas secara transaksional.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param array<string, mixed> $data Data pendaftar yang akan didaftarkan.
 * 
 * @throws KuotaPenuhException Jika kuota kelas sudah habis/penuh.
 * @throws Throwable Jika terjadi kesalahan database lain saat transaksi.
 * 
 * @return void
 */
function daftarkanDenganKuota(PDO $pdo, array $data): void
{
    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare('SELECT kuota FROM kelas WHERE id = :id FOR UPDATE');
        $stmt->execute(['id' => $data['kelas_id']]);
        $kuota = (int) $stmt->fetchColumn();
        $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE kelas_id = :id');
        $stmt->execute(['id' => $data['kelas_id']]);
        if ((int) $stmt->fetchColumn() >= $kuota) {
            throw new KuotaPenuhException('Kuota kelas sudah penuh.');
        }

        tambahPendaftar($pdo, $data);

        $pdo->commit();
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $e;
    }
}
