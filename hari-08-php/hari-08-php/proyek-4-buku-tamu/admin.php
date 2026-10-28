<?php

declare(strict_types=1);

require_once __DIR__ . '/functions.php';

$aksi = $_GET['aksi'] ?? '';

if ($aksi === 'ekspor') {
    eksporCsv();
}

if ($aksi === 'hapus' && isset($_GET['id'])) {
    $idHapus = (int) $_GET['id'];
    hapusTamu($idHapus);
    header('Location: admin.php?status=terhapus');
    exit;
}

$daftarTamu = array_reverse(ambilSemuaTamu());
?>
<!DOCTYPE html>
<html lang='id'>

<head>
    <meta charset='UTF-8'>
    <title>Admin Buku Tamu</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 10px;
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f4f4f4;
        }

        .btn-danger {
            color: red;
            text-decoration: none;
        }
    </style>
</head>

<body>

    <h1>Panel Admin Buku Tamu</h1>
    <p>
        <a href="index.php">&larr; Kembali ke Buku Tamu</a> |
        <a href="admin.php?aksi=ekspor">Ekspor ke CSV</a>
    </p>

    <?php if (($_GET['status'] ?? '') === 'terhapus'): ?>
        <p style="color: green;"><strong>Pesan berhasil dihapus.</strong></p>
    <?php endif; ?>

    <h2>Kelola Pesan Tamu</h2>
    <?php if ($daftarTamu === []): ?>
        <p>Belum ada data pesan.</p>
    <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Waktu</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Pesan</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($daftarTamu as $tamu): ?>
                    <tr>
                        <td><?= e((string)$tamu['id']) ?></td>
                        <td><?= e($tamu['waktu']) ?></td>
                        <td><?= e($tamu['nama']) ?></td>
                        <td><?= e($tamu['email']) ?></td>
                        <td><?= nl2br(e($tamu['pesan'])) ?></td>
                        <td>
                            <a href="admin.php?aksi=hapus&id=<?= $tamu['id'] ?>" class="btn-danger" onclick="return confirm('Yakin ingin menghapus pesan ini?')">Hapus</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>

</body>

</html>