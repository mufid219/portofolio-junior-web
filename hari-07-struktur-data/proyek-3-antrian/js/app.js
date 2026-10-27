import { inisialisasiAntrian } from './antrian.js';
import { inisialisasiRiwayat } from './riwayat.js';

// 1. Inisialisasi Modul Antrean Loket
inisialisasiAntrian({
    dipanggil: document.getElementById('dipanggil'),
    jumlah: document.getElementById('jumlah'),
    daftar: document.getElementById('daftar'),
    riwayatDaftar: document.getElementById('riwayat-daftar'),
    btnAmbil: document.getElementById('ambil'),
    btnPanggil: document.getElementById('panggil'),
    btnReset: document.getElementById('reset')
});

// 2. Inisialisasi Modul Text Editor & Undo/Redo
inisialisasiRiwayat({
    editor: document.getElementById('editor'),
    tombolUndo: document.getElementById('undo'),
    tombolRedo: document.getElementById('redo'),
    info: document.getElementById('info')
});