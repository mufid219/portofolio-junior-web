<?php

declare(strict_types=1);

require_once __DIR__ . '/functions.php';

$galat = [];
$lama = ['nama' => '', 'email' => '', 'pesan' => ''];
$ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Cek Rate Limit (1 pesan per 30 detik)
    $sisaWaktu = cekRateLimit($ip);
    if ($sisaWaktu > 0) {
        $galat['umum'] = "Harap tunggu $sisaWaktu detik lagi sebelum mengirim pesan berikutnya.";
    } else {
        $hasil = validasiTamu($_POST);
        $lama = $hasil['data'];
        $galat = $hasil['galat'];

        if ($galat === []) {
            if (simpanTamu($hasil['data'], $ip)) {
                header('Location: index.php?status=sukses');
                exit;
            }
            $galat['umum'] = 'Gagal menyimpan data. Silakan coba lagi.';
        }
    }
}

$kata = trim((string) ($_GET['q'] ?? ''));
$halamanAktif = max(1, (int) ($_GET['halaman'] ?? 1));

// Ambil dan balikkan urutan (terbaru di atas), lalu filter pencarian
$daftarTamu = array_reverse(cariTamu(ambilSemuaTamu(), $kata));
$totalData = count($daftarTamu);
$totalHalaman = max(1, (int) ceil($totalData / PER_HALAMAN));

if ($halamanAktif > $totalHalaman) {
    $halamanAktif = $totalHalaman;
}

$offset = ($halamanAktif - 1) * PER_HALAMAN;
$daftarTamuHalamanIni = array_slice($daftarTamu, $offset, PER_HALAMAN);
?>
<!DOCTYPE html>
<html lang='id'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Buku Tamu Daring</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            max-width: 600px;
        }

        .error {
            color: red;
            font-size: 0.9em;
        }

        article {
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
            margin-bottom: 10px;
        }

        .pagination {
            margin-top: 15px;
        }

        .pagination a,
        .pagination span {
            padding: 5px 10px;
            border: 1px solid #ccc;
            margin-right: 5px;
            text-decoration: none;
        }

        .pagination .active {
            background-color: #007BFF;
            color: white;
            border-color: #007BFF;
        }
    </style>
</head>

<body>

    <h1>Buku Tamu</h1>
    <p><a href="admin.php">Masuk Halaman Admin</a></p>

    <?php if (($_GET['status'] ?? '') === 'sukses'): ?>
        <p role='status' style="color: green;"><strong>Terima kasih, pesan Anda sudah tersimpan.</strong></p>
    <?php endif; ?>

    <?php if (isset($galat['umum'])): ?>
        <p role='alert' class="error"><strong><?= e($galat['umum']) ?></strong></p>
    <?php endif; ?>

    <form method='post' action='index.php'>
        <p>
            <label for='nama'>Nama</label><br>
            <input id='nama' name='nama' value='<?= e($lama['nama']) ?>'>
            <?php if (isset($galat['nama'])): ?><br><span class="error"><?= e($galat['nama']) ?></span><?php endif; ?>
        </p>
        <p>
            <label for='email'>Email</label><br>
            <input id='email' name='email' type='email' value='<?= e($lama['email']) ?>'>
            <?php if (isset($galat['email'])): ?><br><span class="error"><?= e($galat['email']) ?></span><?php endif; ?>
        </p>
        <p>
            <label for='pesan'>Pesan</label><br>
            <textarea id='pesan' name='pesan' rows='4'><?= e($lama['pesan']) ?></textarea>
            <?php if (isset($galat['pesan'])): ?><br><span class="error"><?= e($galat['pesan']) ?></span><?php endif; ?>
        </p>
        <button type='submit'>Kirim Pesan</button>
    </form>

    <hr>

    <h2>Daftar Tamu</h2>
    <form method='get' action='index.php'>
        <label for='q'>Cari nama:</label>
        <input id='q' name='q' value='<?= e($kata) ?>'>
        <button type='submit'>Cari</button>
        <?php if ($kata !== ''): ?>
            <a href="index.php">Reset</a>
        <?php endif; ?>
    </form>

    <?php if ($daftarTamuHalamanIni === []): ?>
        <p>Belum ada data tamu.</p>
    <?php else: ?>
        <?php foreach ($daftarTamuHalamanIni as $tamu): ?>
            <article>
                <h3><?= e($tamu['nama']) ?></h3>
                <p><small>Dikirim pada: <?= e($tamu['waktu']) ?></small></p>
                <p><?= nl2br(e($tamu['pesan'])) ?></p>
            </article>
        <?php endforeach; ?>

        <!-- Paginasi -->
        <div class="pagination">
            <?php for ($i = 1; $i <= $totalHalaman; $i++): ?>
                <?php
                $queryParams = ['halaman' => $i];
                if ($kata !== '') $queryParams['q'] = $kata;
                $urlQuery = http_build_query($queryParams);
                ?>
                <?php if ($i === $halamanAktif): ?>
                    <span class="active"><?= $i ?></span>
                <?php else: ?>
                    <a href="index.php?<?= $urlQuery ?>"><?= $i ?></a>
                <?php endif; ?>
            <?php endfor; ?>
        </div>
    <?php endif; ?>

</body>

</html>