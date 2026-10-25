/**
 * Menghitung rata-rata dari daftar nilai.
 * @param {number[]} daftarNilai - Array angka.
 * @returns {number} Rata-rata, atau 0 bila array kosong.
 */
function hitungRataRata(daftar) {
    if (daftar.length === 0) return 0;
    return daftar.reduce((jumlah, n) => jumlah + n, 0) / daftar.length;
}

/**
 * Mencari nilai tertinggi dari daftar nilai.
 *
 * @param {number[]} daftarNilai - daftarNilai - Array angka.
 * @returns {number|null} Nilai tertinggi, atau null jika array kosong.
 */
function cariTertinggi(daftar) {
    return daftar.length === 0 ? null : Math.max(...daftar);
}

/**
 * Mencari nilai terendah dari daftar nilai.
 *
 * @param {number[]} daftarNilai - daftarNilai - Array angka.
 * @returns {number|null} Nilai terendah, atau null jika array kosong.
 */
function cariTerendah(daftar) {
    return daftar.length === 0 ? null : Math.min(...daftar);
}

export { hitungRataRata, cariTertinggi, cariTerendah }