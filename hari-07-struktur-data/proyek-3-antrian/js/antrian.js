import { Queue, Stack } from './structures.js';

export function inisialisasiAntrian(elemenDom) {
    const { dipanggil, jumlah, daftar, riwayatDaftar, btnAmbil, btnPanggil, btnReset } = elemenDom;

    const antrian = new Queue();
    const riwayatStack = new Stack();
    const BATAS_RIWAYAT = 5;
    const AWALAN_NOMOR = 'A';

    // Kunci LocalStorage untuk Reset Harian
    const KUNCI_TANGGAL = 'antrean_tanggal';
    const KUNCI_NOMOR = 'antrean_nomorTerakhir';

    const hariIni = new Date().toISOString().slice(0, 10);
    let tanggalTersimpan = localStorage.getItem(KUNCI_TANGGAL);
    let nomorTerakhir = parseInt(localStorage.getItem(KUNCI_NOMOR)) || 0;

    if (tanggalTersimpan !== hariIni) {
        nomorTerakhir = 0;
        localStorage.setItem(KUNCI_TANGGAL, hariIni);
        localStorage.setItem(KUNCI_NOMOR, nomorTerakhir);
    }

    function formatNomor(angka) {
        return AWALAN_NOMOR + String(angka).padStart(3, '0');
    }

    function perbaruiTampilan() {
        // Tampilkan antrean menunggu
        daftar.textContent = '';
        for (const nomor of antrian.toArray()) {
            const li = document.createElement('li');
            li.textContent = nomor;
            daftar.append(li);
        }
        jumlah.textContent = antrian.size();

        // Tampilkan riwayat 5 nomor terakhir (mengambil dari items Stack tanpa ubah structures.js)
        riwayatDaftar.textContent = '';
        const arrayRiwayat = [...riwayatStack.items].reverse();
        for (const nomor of arrayRiwayat) {
            const li = document.createElement('li');
            li.textContent = nomor;
            riwayatDaftar.append(li);
        }
    }

    btnAmbil.addEventListener('click', () => {
        nomorTerakhir++;
        localStorage.setItem(KUNCI_NOMOR, nomorTerakhir);
        antrian.enqueue(formatNomor(nomorTerakhir));
        perbaruiTampilan();
    });

    btnPanggil.addEventListener('click', () => {
        if (antrian.isEmpty()) {
            dipanggil.textContent = 'Antrean kosong';
        } else {
            const nomorDipanggil = antrian.dequeue();
            dipanggil.textContent = nomorDipanggil;

            riwayatStack.push(nomorDipanggil);
            riwayatStack.trimToMax(BATAS_RIWAYAT);
        }
        perbaruiTampilan();
    });

    btnReset.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin mereset seluruh antrean dan riwayat hari ini?')) {
            antrian.items = {};
            antrian.head = 0;
            antrian.tail = 0;
            riwayatStack.clear();
            nomorTerakhir = 0;
            localStorage.setItem(KUNCI_NOMOR, nomorTerakhir);
            dipanggil.textContent = '-';
            perbaruiTampilan();
        }
    });

    perbaruiTampilan();
}