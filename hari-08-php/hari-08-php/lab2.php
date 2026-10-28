<?php

declare(strict_types=1);
$peserta = [
    ['nama' => 'Sari', 'kelas' => 'Web', 'nilai' => 90],
    ['nama' => 'Budi', 'kelas' => 'Web', 'nilai' => 68],
    ['nama' => 'Citra', 'kelas' => 'Data', 'nilai' => 82],
];

// 1. hitungRataRata(array $daftar): float dan cariTertinggi(array $daftar): ?array.

function hitungRataRata(array $daftar): float
{
    $total = array_sum(array_column($daftar, 'nilai'));
    return $total / count($daftar);
}

function cariTertinggi(array $daftar): ?array
{
    $maxNilai = max(array_column($daftar, 'nilai'));
    $result = array_filter($daftar, function ($item) use ($maxNilai) {
        return $item['nilai'] === $maxNilai;
    });
    return array_values($result)[0] ?? null;
}

echo '<h3>Hasil Fungsi</h3>';
$rataRata = hitungRataRata($peserta);
echo '<p>Rata-rata nilai: ' . $rataRata . '</p>';
$tertinggi = cariTertinggi($peserta);
if ($tertinggi) {
    echo '<p>Peserta dengan nilai tertinggi: ' . $tertinggi['nama'] . ' adalah ' . $tertinggi['nilai'] . '</p>';
} else {
    echo '<p>Tidak ada peserta.</p>';
}

// 2. filterLulus(array $peserta, int $batas = 70): array dengan array_filter.

function filterNilaiLebihDari70(array $daftar): array
{
    $result = array_filter($daftar, function ($item) {
        return $item['nilai'] > 70;
    });

    // array_values digunakan untuk mereset index array menjadi berurutan dari 0
    return array_values($result);
}

$hasilFilter = filterNilaiLebihDari70($peserta);

foreach ($hasilFilter as $siswa) {
    echo "Nama " . $siswa['nama'] . " - Nilai: " . $siswa['nilai'] . "</br>";
}

// 3. urutkanNilai(array $peserta): array dengan usort (kembalikan salinan).

echo "<h3>Urutkan Nilai </h3>";

function urutkanNilai(array $peserta): array
{
    // membuat salinan array
    $salinanPeserta = $peserta;

    // mengurutkan salinan menggunakan usort
    usort($salinanPeserta, function ($a, $b) {
        // mengurutkan dari nilai terbesar ke terkecil (DESC)
        // jika ingin dari terkecil ke terbesar (ASC), gunakan : return $a['nilai'] <=> $b['nilai'];
        return $b['nilai'] <=> $a['nilai'];
    });
    return $salinanPeserta;
}

$pesertaTelahDiurutkan = urutkanNilai($peserta);
// echo "<p>".print_r($pesertaTelahDiurutkan)."</p>";

// mencetak hasilnya
foreach ($pesertaTelahDiurutkan as $p) {
    echo "Nama: " . $p['nama'] . " | Nilai: " . $p['nilai'] . "</br>";
}


// 4. kelompokkanPerKelas(array $peserta): array yang menghasilkan ['Web' => [...], 'Data' => [...]].
function kelompokkanPerKelas(array $peserta): array
{
    $hasil = [];

    foreach ($peserta as $p) {
        $kelas = $p['kelas'];
        // memasukan data peserta ke dalam array berdasarkan nama kelasnya
        $hasil[$kelas][] = $p;
    }

    return $hasil;
}

$dataPerKelas = kelompokkanPerKelas($peserta);
foreach ($dataPerKelas as $namaKelas => $daftarPeserta) {
    // cetak nama kelas sebagai judul (Heading)
    echo "<h3>Kelas " . $namaKelas . "</h3>";
    // buat list HTML
    echo "<ul>";
    // perulangan dalam: mengambil setiap peserta di dalam kelas tersebut
    foreach ($daftarPeserta as $siswa) {
        echo "<li>Nama: " . $siswa['nama'] . " | Nilai: " . $siswa['nilai'] . "</li>";
    }
    // tutup list HTML
    echo "</ul>";
    echo "<hr>";
}

// 5. Tampilkan hasil dalam tabel HTML berisi nomor, nama, kelas, nilai, dan grade. Semua output di-escape dengan htmlspecialchars.

foreach ($dataPerKelas as $namaKelas => $daftarPeserta) {
    // cetak nama kelas sebagai judul (Heading)
    echo "<h3>Kelas " . $namaKelas . "</h3>";
    // buat list HTML
    echo "<table border='1'>";
    // perulangan dalam: mengambil setiap peserta di dalam kelas tersebut
    echo "<tr><th>Nama</th><th>Nilai</th></tr>";
    foreach ($daftarPeserta as $siswa) {
        echo "<tr><td>" . htmlspecialchars($siswa['nama']) . "</td><td>" . $siswa['nilai'] . "</td></tr>";
    }
    // tutup list HTML
    echo "</table>";
    echo "<hr>";
}
