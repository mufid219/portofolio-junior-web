<?php

declare(strict_types=1);
/**
 * Mencari data admin berdasarkan nama pengguna (username).
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param string $username Nama pengguna admin yang dicari.
 * 
 * @return array<string, mixed>|null Baris data admin (id, username, password_hash), atau null jika tidak ditemukan.
 */
function cariAdmin(PDO $pdo, string $username): ?array
{
    $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admin WHERE username = :u');
    $stmt->execute(['u' => $username]);
    $baris = $stmt->fetch();
    return $baris === false ? null : $baris;
}

/**
 * Memproses masuk (login) admin dengan memeriksa kecocokan username dan verifikasi kata sandi.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param string $username Nama pengguna admin.
 * @param string $sandi Kata sandi mentah yang dimasukkan.
 * 
 * @return bool True jika login berhasil, false jika gagal.
 */
function prosesLogin(PDO $pdo, string $username, string $sandi): bool
{
    $admin = cariAdmin($pdo, $username);
    if ($admin === null || !password_verify($sandi, $admin['password_hash'])) {
        return false;
    }
    session_regenerate_id(true);
    $_SESSION['admin_id'] = (int) $admin['id'];
    return true;
}

/**
 * Memastikan bahwa admin sudah login. Jika belum (sesi admin_id kosong), dialihkan ke halaman login.
 *
 * @return void
 */
function wajibLogin(): void
{

    if (empty($_SESSION['admin_id'])) {
        redirect('login.php');
    }
}

/**
 * Mengakhiri sesi (logout) admin, menghapus seluruh data sesi, serta membersihkan kuki sesi terkait.
 *
 * @return void
 */
function logout(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $p['path'],
            $p['domain'],
            $p['secure'],
            $p['httponly']
        );
    }
    session_destroy();
}
