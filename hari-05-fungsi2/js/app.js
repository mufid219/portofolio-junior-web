import { hitungRataRata, cariTertinggi, cariTerendah } from './matematika.js';

const input = document.getElementById('input-nilai');
const tombol = document.getElementById('proses');
const elRata = document.getElementById('hasil-rata');
const elTinggi = document.getElementById('hasil-tinggi');
const elRendah = document.getElementById('hasil-rendah');
const elPesan = document.getElementById('pesan');

/**
 * Mengubah string "80, 90, abc, 75" menjadi array angka valid [80, 90, 75].
 * @param {string} teks
 * @returns {number[]}
 */
function parseNilai(teks) {
    return teks
        .split(',')
        .map(s => Number(s.trim()))
        .filter(n => Number.isFinite(n));
}

tombol.addEventListener('click', () => {
    const nilai = parseNilai(input.value);

    if (nilai.length === 0) {
        elRata.textContent = elTinggi.textContent = elRendah.textContent = '-';
        elPesan.textContent = '⚠️ Masukkan minimal satu angka valid.';
        return;
    }

    elRata.textContent = hitungRataRata(nilai).toFixed(2);
    elTinggi.textContent = cariTertinggi(nilai);
    elRendah.textContent = cariTerendah(nilai);
    elPesan.textContent = `✅ ${nilai.length} nilai diproses.`;
});