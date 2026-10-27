import { Queue, Stack } from '../structures.js';

const antrian = new Queue();
const riwayatStack = new Stack(); // Menggunakan Stack untuk riwayat maksimal 5 item
const BATAS_RIWAYAT = 5;

// Kunci LocalStorage untuk Reset Harian
const KUNCI_TANGGAL = 'antrean_tanggal';
const KUNCI_NOMOR = 'antrean_nomorTerakhir';

const hariIni = new Date().toISOString().slice(0, 10); // Format 'YYYY-MM-DD'
let tanggalTersimpan = localStorage.getItem(KUNCI_TANGGAL);
let nomorTerakhir = parseInt(localStorage.getItem(KUNCI_NOMOR)) || 0;

// Cek apakah sudah berganti hari, jika ya, reset nomor terakhir ke 0
if (tanggalTersimpan !== hariIni) {
    nomorTerakhir = 0;
    localStorage.setItem(KUNCI_TANGGAL, hariIni);
    localStorage.setItem(KUNCI_NOMOR, nomorTerakhir);
}

// Elemen DOM
const dipanggil = document.getElementById('dipanggil');
const jumlah = document.getElementById('jumlah');
const daftar = document.getElementById('daftar');
const riwayatDaftar = document.getElementById('riwayat-daftar');

function formatNomor(angka) {
    return 'A' + String(angka).padStart(3, '0');
}

function perbaruiTampilan() {
    // 1. Tampilkan antrean menunggu
    daftar.textContent = '';
    for (const nomor of antrian.toArray()) {
        const li = document.createElement('li');
        li.textContent = nomor;
        daftar.append(li);
    }
    jumlah.textContent = antrian.size();

    // 2. Tampilkan riwayat 5 nomor terakhir (dibalik agar yang terbaru di atas)
    riwayatDaftar.textContent = '';
    const arrayRiwayat = [...riwayatStack.items].reverse();
    for (const nomor of arrayRiwayat) {
        const li = document.createElement('li');
        li.textContent = nomor;
        riwayatDaftar.append(li);
    }
}

// Event: Ambil Nomor
document.getElementById('ambil').addEventListener('click', () => {
    nomorTerakhir++;
    localStorage.setItem(KUNCI_NOMOR, nomorTerakhir);

    antrian.enqueue(formatNomor(nomorTerakhir));
    perbaruiTampilan();
});

// Event: Panggil Berikutnya
document.getElementById('panggil').addEventListener('click', () => {
    if (antrian.isEmpty()) {
        dipanggil.textContent = 'Antrean kosong';
    } else {
        const nomorDipanggil = antrian.dequeue();
        dipanggil.textContent = nomorDipanggil;

        // Masukkan ke Stack riwayat dan batasi maksimal 5 item
        riwayatStack.push(nomorDipanggil);
        riwayatStack.trimToMax(BATAS_RIWAYAT);
    }
    perbaruiTampilan();
});

// Event: Tombol Reset Manual
document.getElementById('reset').addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin mereset seluruh antrean dan riwayat hari ini?')) {
        antrian.clear ? antrian.clear() : (antrian.items = {}, antrian.head = 0, antrian.tail = 0);
        riwayatStack.clear();
        nomorTerakhir = 0;
        localStorage.setItem(KUNCI_NOMOR, nomorTerakhir);
        dipanggil.textContent = '-';
        perbaruiTampilan();
    }
});

// Inisialisasi tampilan awal saat halaman dimuat
perbaruiTampilan();