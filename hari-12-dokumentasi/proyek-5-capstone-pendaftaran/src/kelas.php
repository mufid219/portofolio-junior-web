<?php

declare(strict_types=1);

/**
 * Mengambil semua daftar kelas.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @return array<int, array<string, mixed>> Daftar kelas.
 */
function ambilSemuaKelas(PDO $pdo): array
{
    return $pdo->query('SELECT id, nama_kelas, kuota FROM kelas ORDER BY id ASC')->fetchAll();
}
function HitungKelas(PDO $pdo, string $kata): int
{
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM kelas WHERE nama_kelas LIKE :kata');
    $stmt->execute(['kata' => '%' . $kata . '%']);
    return (int) $stmt->fetchColumn();
}
/**
 * Mengambil satu kelas berdasarkan ID.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id ID kelas.
 * @return array<string, mixed>|null Baris kelas, atau null bila tidak ditemukan.
 */
function ambilKelasById(PDO $pdo, int $id): ?array
{
    $stmt = $pdo->prepare('SELECT * FROM kelas WHERE id = :id');
    $stmt->execute(['id' => $id]);
    $baris = $stmt->fetch();
    return $baris === false ? null : $baris;
}

/**
 * Memeriksa apakah nama kelas sudah terdaftar.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param string $nama_kelas Nama kelas yang diperiksa.
 * @param int|null $kecualiId ID yang dikecualikan saat proses ubah.
 * @return bool true bila sudah ada.
 */
function namaKelasSudahAda(PDO $pdo, string $nama_kelas, ?int $kecualiId): bool
{
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM kelas WHERE nama_kelas = :nama_kelas AND id <> :id');
    $stmt->execute(['nama_kelas' => $nama_kelas, 'id' => $kecualiId ?? 0]);
    return (int) $stmt->fetchColumn() > 0;
}

/**
 * Memvalidasi masukan form kelas.
 */
function validasiKelas(array $input, PDO $pdo, ?int $idUbah): array
{
    $data = [
        'nama_kelas' => trim((string) ($input['nama_kelas'] ?? '')),
        'kuota'      => (int) ($input['kuota'] ?? 0),
    ];
    $galat = [];

    if (mb_strlen($data['nama_kelas']) < 3) {
        $galat['nama_kelas'] = 'Nama kelas minimal 3 karakter.';
    } elseif (namaKelasSudahAda($pdo, $data['nama_kelas'], $idUbah)) {
        $galat['nama_kelas'] = 'Nama kelas ini sudah terdaftar.';
    }

    if ($data['kuota'] < 1) {
        $galat['kuota'] = 'Kuota minimal 1.';
    }

    return ['data' => $data, 'galat' => $galat];
}

function tambahKelas(PDO $pdo, array $d): bool
{
    $sql = 'INSERT INTO kelas (nama_kelas, kuota) VALUES (:nama_kelas, :kuota)';
    return $pdo->prepare($sql)->execute($d);
}

function ubahKelas(PDO $pdo, int $id, array $d): bool
{
    $sql = 'UPDATE kelas SET nama_kelas = :nama_kelas, kuota = :kuota WHERE id = :id';
    return $pdo->prepare($sql)->execute($d + ['id' => $id]);
}

function hapusKelas(PDO $pdo, int $id): bool
{
    // Cek apakah ada pendaftar di kelas ini sebelum dihapus
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE kelas_id = :id');
    $stmt->execute(['id' => $id]);

    if ((int) $stmt->fetchColumn() > 0) {
        throw new RuntimeException('Kelas tidak bisa dihapus karena sudah ada peserta yang mendaftar di kelas ini.');
    }

    return $pdo->prepare('DELETE FROM kelas WHERE id = :id')->execute(['id' => $id]);
}
