<?php

declare(strict_types=1);
/**
 * Mengamankan string dari potensi serangan XSS dengan melakukan escape karakter khusus HTML.
 *
 * @param string|null $teks Teks mentah yang akan di-escape, atau null.
 * 
 * @return string Teks yang sudah aman untuk ditampilkan di HTML.
 */
function e(?string $teks): string
{
    return htmlspecialchars($teks ?? '', ENT_QUOTES, 'UTF-8');
}

/**
 * Melakukan pengalihan (redirect) HTTP ke URL lain dan menghentikan eksekusi skrip.
 *
 * @param string $url Alamat URL tujuan pengalihan.
 * 
 * @return never
 */
function redirect(string $url): never
{
    header('Location: ' . $url);
    exit;
}

/**
 * Membuat atau mengambil token CSRF (Cross-Site Request Forgery) yang disimpan di sesi.
 *
 * @return string Token CSRF dalam format hexadecimal.
 */
function tokenCsrf(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

/**
 * Memeriksa validitas token CSRF dari kiriman form (POST).
 * Mengirimkan status HTTP 403 dan menghentikan skrip jika token tidak valid.
 *
 * @return void
 */
function cekCsrf(): void
{
    $kiriman = (string) ($_POST['csrf'] ?? '');
    if (!hash_equals($_SESSION['csrf'] ?? '', $kiriman)) {
        http_response_code(403);
        exit('Permintaan tidak valid.');
    }
}

/**
 * Menyimpan pesan kilat (flash message) ke dalam sesi untuk ditampilkan sekali.
 *
 * @param string $pesan Pesan yang akan disimpan.
 * 
 * @return void
 */
function setFlash(string $pesan): void
{
    $_SESSION['flash'] = $pesan;
}

/**
 * Mengambil pesan kilat (flash message) dari sesi dan langsung menghapusnya agar tidak tampil berulang.
 *
 * @return string|null Pesan flash, atau null jika tidak ada.
 */
function ambilFlash(): ?string
{
    $pesan = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);
    return $pesan;
}

/**
 * Memeriksa apakah admin sudah masuk (login). Jika belum, akan mengatur pesan flash dan mengalihkan ke halaman login.
 *
 * @return void
 */
function cekLoginAdmin(): void
{
    if (empty($_SESSION['admin_login'])) {
        setFlash('Silahkan login terlebih dahulu.');
        redirect('login.php');
    }
}
