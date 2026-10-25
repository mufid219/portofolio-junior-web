const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const NILAI_MIN = 0;
const NILAI_MAKS = 100;
const BATAS_LULUS = 70;
async function main() {
    const rl = readline.createInterface({ input, output });
    const daftarNama = [];
    const daftarNilai = [];
    let jalan = true;
    while (jalan) {

        tampilkanMenu();

        const pilihan = await rl.question('Pilih menu (1-4): ');
        switch (pilihan) {
            case '1': {
                const nama = (await rl.question('Nama siswa: ')).trim();
                const nilai = Number(await rl.question('Nilai (0-100): '));
                // TODO: validasi nama tidak kosong dan nilai 0-100 (Number.isNaN)
                // TODO: jika valid, push ke daftarNama dan daftarNilai

                if (!nilaiValid(nilai)) {
                    console.log("Nilai tidak valid. Masukkan nilai antara 0 dan 100.");
                } else {
                    daftarNama.push(nama);
                    daftarNilai.push(nilai);
                }

                break;
            }
            case '2': {
                // TODO: jika kosong tampilkan pesan; jika ada hitung rata-rata,
                // nilai tertinggi, dan nilai terendah dengan perulangan

                if (daftarNama.length === 0) {
                    console.log("Tidak ada data siswa.");
                } else {
                    console.log(`Rata-rata: ${hitungRataRata(daftarNilai).toFixed(2)}`);
                    console.log(`Nilai tertinggi: ${cariTertinggi(daftarNilai)}`);
                    console.log(`Nilai terendah: ${cariTerendah(daftarNilai)}`);
                }
                break;
            }
            case '3': {
                // TODO: for dengan indeks; tampilkan nama, nilai, grade A/B/C/D, Lulus/Tidak lulus

                for (let i = 0; i < daftarNilai.length; i++) {
                    tampilkanLaporan(daftarNama[i], daftarNilai[i]);
                    console.log(`Grade: ${tentukanGrade(daftarNilai[i])}`);
                    console.log(`Status: ${tentukanStatus(daftarNilai[i])}`);
                }

                break;
            }
            case '4':
                jalan = false;
                console.log('Terima kasih.');
                break;
            default:
                console.log('Pilihan tidak valid.');
        }
    }
    rl.close();
}
main();

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
 * @param {number[]} daftarNilai - Array angka.
 * @returns {number|null} Nilai tertinggi, atau null bila array kosong.
 */
function cariTertinggi(daftar) {
    return daftar.length === 0 ? null : Math.max(...daftar);
}

/**
 * Mencari nilai terendah dari daftar nilai.
 * @param {number[]} daftarNilai - Array angka.
 * @returns {number|null} Nilai terendah, atau null bila array kosong.
 */
function cariTerendah(daftar) {
    return daftar.length === 0 ? null : Math.min(...daftar);
}

/**
 * Menentukan grade berdasarkan nilai.
 * @param {number} nilai - Nilai siswa.
 * @returns {string} Grade (A, B, C, atau D).
 */
function tentukanGrade(nilai) {
    if (nilai >= 85) return 'A';
    if (nilai >= 70) return 'B';
    if (nilai >= 55) return 'C';
    return 'D';
}

/**
 * Menentukan status kelulusan berdasarkan nilai.
 * @param {number} nilai - Nilai siswa.
 * @returns {string} Status (Lulus atau Tidak lulus).
 */
function tentukanStatus(nilai) {
    return nilai >= BATAS_LULUS ? 'Lulus' : 'Tidak lulus';
}

/**
 * Memeriksa apakah nilai valid.
 * @param {number} nilai - Nilai siswa.
 * @returns {boolean} true bila nilai valid, false otherwise.
 */
function nilaiValid(nilai) {
    return Number.isFinite(nilai) && nilai >= 0 && nilai <= 100;
}

/**
 * Menampilkan menu utama.
 */
function tampilkanMenu() {
    console.log("\n===== PENGOLAH NILAI =====");
    console.log("1. Input nilai siswa");
    console.log("2. Tampilkan statistik");
    console.log("3. Tampilkan predikat per siswa");
    console.log("4. Keluar");
}
/**
 * Menampilkan informasi siswa.
 * @param {string} nama - Nama siswa.
 * @param {number} nilai - Nilai siswa.
 */
function tampilkanLaporan(nama, nilai) {
    console.log(`Nama: ${nama}, Nilai: ${nilai}`);
}