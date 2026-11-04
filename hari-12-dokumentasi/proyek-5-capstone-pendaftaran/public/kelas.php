<?php

declare(strict_types=1);
require_once __DIR__ . '/../src/bootstrap.php';
wajibLogin();

$pdo = getConnection();
$kata = trim((string) ($_GET['q'] ?? ''));
$perHalaman = 10;
$total = hitungKelas($pdo, $kata);
$jumlahHalaman = max(1, (int) ceil($total / $perHalaman));
$halaman = min($jumlahHalaman, max(1, (int) ($_GET['hal'] ?? 1)));
$daftar_kelas = ambilSemuaKelas($pdo);
// $daftar_kelas = ambilSemuaKelas($pdo, $kata, $perHalaman, ($halaman - 1) * $perHalaman);
//$daftar_kelas = ambilSemuaKelas($pdo);


$judul = 'Daftar Kelas';
require __DIR__ . '/../templates/header.php';
?>

<div class="mb-3">
    <a href="tambah_kelas.php" class="btn btn-success">Tambah Kelas Baru</a>
</div>

<?php if ($daftar_kelas === []): ?>
    <p>Belum ada data kelas.</p>
<?php else: ?>
    <div class='table-responsive'>
        <table id='tabelKelas' class='table table-striped align-middle'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama Kelas</th>
                    <th>Kuota</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($daftar_kelas as $k): ?>
                    <tr>
                        <td><?= e((string)$k['id']) ?></td>
                        <td><?= e($k['nama_kelas']) ?></td>
                        <td><?= e((string)$k['kuota']) ?></td>
                        <td>
                            <a class='btn btn-sm btn-outline-secondary' href='ubah_kelas.php?id=<?= (int) $k['id'] ?>'>Ubah</a>
                            <form method='post' action='hapus_kelas.php' class='form-hapus d-inline' data-nama='<?= e($k['nama_kelas']) ?>'>
                                <input type='hidden' name='csrf' value='<?= e(tokenCsrf()) ?>'>
                                <input type='hidden' name='id' value='<?= (int) $k['id'] ?>'>
                                <button class='btn btn-sm btn-outline-danger' type='submit'>Hapus</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
<?php endif; ?>

<?php require __DIR__ . '/../templates/footer.php'; ?>