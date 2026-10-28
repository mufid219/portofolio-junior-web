<?php

declare(strict_types=1);

const FILE_TAMU = __DIR__ . '/data/tamu.json';
const FILE_LIMIT = __DIR__ . '/data/ratelimit.json';
const MAKS_PESAN = 500;
const BATAS_WAKTU_DETIK = 30;
const PER_HALAMAN = 5;

function e(string $teks): string
{
    return htmlspecialchars($teks, ENT_QUOTES, 'UTF-8');
}

function bersihkanSpasi(string $teks): string
{
    return trim((string) preg_replace('/\s+/', ' ', $teks));
}

/**
 * Memvalidasi input buku tamu.
 *
 * @param array<string, mixed> $input Data mentah (biasanya $_POST).
 * @return array{data: array<string, string>, galat: array<string, string>}
 */
function validasiTamu(array $input): array
{
    $data = [
        'nama' => bersihkanSpasi((string) ($input['nama'] ?? '')),
        'email' => trim((string) ($input['email'] ?? '')),
        'pesan' => trim((string) ($input['pesan'] ?? '')),
    ];
    $galat = [];

    if (mb_strlen($data['nama']) < 3) {
        $galat['nama'] = 'Nama minimal 3 karakter.';
    }
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $galat['email'] = 'Format email tidak valid.';
    }

    $panjang = mb_strlen($data['pesan']);
    if ($panjang === 0 || $panjang > MAKS_PESAN) {
        $galat['pesan'] = 'Pesan wajib diisi, maksimal ' . MAKS_PESAN . ' karakter.';
    }

    return ['data' => $data, 'galat' => $galat];
}

function ambilSemuaTamu(): array
{
    if (!file_exists(FILE_TAMU)) {
        return [];
    }
    $isi = file_get_contents(FILE_TAMU);
    $daftar = json_decode($isi === false ? '[]' : $isi, true);
    return is_array($daftar) ? $daftar : [];
}

/**
 * Memeriksa rate limit berdasarkan IP (1 pesan per 30 detik).
 */
function cekRateLimit(string $ip): int
{
    if (!file_exists(FILE_LIMIT)) {
        return 0;
    }
    $data = json_decode(file_get_contents(FILE_LIMIT) ?: '{}', true);
    if (!is_array($data) || !isset($data[$ip])) {
        return 0;
    }

    $selisih = time() - $data[$ip];
    if ($selisih < BATAS_WAKTU_DETIK) {
        return BATAS_WAKTU_DETIK - $selisih;
    }

    return 0;
}

function catatRateLimit(string $ip): void
{
    $folder = dirname(FILE_LIMIT);
    if (!is_dir($folder)) {
        mkdir($folder, 0755, true);
    }
    $data = file_exists(FILE_LIMIT) ? json_decode(file_get_contents(FILE_LIMIT) ?: '{}', true) : [];
    if (!is_array($data)) {
        $data = [];
    }
    $data[$ip] = time();
    file_put_contents(FILE_LIMIT, json_encode($data), LOCK_EX);
}

function simpanTamu(array $data, string $ip): bool
{
    $folder = dirname(FILE_TAMU);
    if (!is_dir($folder) && !mkdir($folder, 0755, true)) {
        return false;
    }
    $daftar = ambilSemuaTamu();
    $data['id'] = $daftar === [] ? 1 : max(array_column($daftar, 'id')) + 1;
    $data['waktu'] = date('Y-m-d H:i:s');
    $daftar[] = $data;

    $json = json_encode($daftar, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($json !== false && file_put_contents(FILE_TAMU, $json, LOCK_EX) !== false) {
        catatRateLimit($ip);
        return true;
    }
    return false;
}

function hapusTamu(int $id): bool
{
    $daftar = ambilSemuaTamu();
    $daftarBaru = array_values(array_filter($daftar, fn($t) => (int)$t['id'] !== $id));

    if (count($daftar) === count($daftarBaru)) {
        return false; // ID tidak ditemukan
    }

    $json = json_encode($daftarBaru, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return $json !== false && file_put_contents(FILE_TAMU, $json, LOCK_EX) !== false;
}

function cariTamu(array $daftar, string $kata): array
{
    if ($kata === '') {
        return $daftar;
    }
    return array_values(array_filter(
        $daftar,
        fn(array $tamu): bool => stripos($tamu['nama'], $kata) !== false
    ));
}

function eksporCsv(): void
{
    $daftar = ambilSemuaTamu();
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=buku-tamu-' . date('Y-m-d') . '.csv');

    $output = fopen('php://output', 'w');
    fputcsv($output, ['ID', 'Waktu', 'Nama', 'Email', 'Pesan']);
    foreach ($daftar as $tamu) {
        fputcsv($output, [$tamu['id'], $tamu['waktu'], $tamu['nama'], $tamu['email'], $tamu['pesan']]);
    }
    fclose($output);
    exit;
}
