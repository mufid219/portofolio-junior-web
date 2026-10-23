const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const { log } = require('console');
const NILAI_MIN = 0;
const NILAI_MAKS = 100;
const BATAS_LULUS = 70;
async function main() {
    const rl = readline.createInterface({ input, output });
    const daftarNama = [];
    const daftarNilai = [];
    let jalan = true;
    while (jalan) {
        tampilMenu()
        const pilihan = await rl.question('Pilih menu (1-4): ');
        switch (pilihan) {
            case '1': {
                const nama = (await rl.question('Nama siswa: ')).trim();
                const nilai = Number(await rl.question('Nilai (0-100): '));
                if (!nilaiValid(nilai)) {
                    console.log("Nilai tidak valid. Masukkan nilai antara 0 dan 100")
                } else {
                    daftarNama.push(nama)
                    daftarNilai.push(nilai)
                }
                // TODO: validasi nama tidak kosong dan nilai 0-100 (Number.isNaN)
                // TODO: jika valid, push ke daftarNama dan daftarNilai
                break;
            }
            case '2': {
                if (daftarNama.length === 0) {
                    console.log("tidak ada data siswa")
                } else {
                    console.log(`Rata-rata: ${hitungRataRata(daftarNilai).toFixed(2)}`)
                    console.log(`Nilai tertinggi: ${cariTertinggi(daftarNilai)}`)
                    console.log(`Nilai terendah: ${cariTerendah(daftarNilai)}`)
                }

                // TODO: jika kosong tampilkan pesan; jika ada hitung rata-rata,
                // nilai tertinggi, dan nilai terendah dengan perulangan
                break;
            }
            case '3': {
                for (let i = 0; i < daftarNama.length; i++) {
                    // console.log(`Nama: ${daftarNama[i]}, Nilai: ${daftarNama[i]}`)
                    tampilSiswa(daftarNama[i], daftarNilai[i])
                    console.log(`Grade: ${tentukanGrade(daftarNilai[i])}`)
                    console.log(`Status: ${tentukanStatus(daftarNilai[i])}`)
                }

                // TODO: for dengan indeks; tampilkan nama, nilai, grade A/B/C/D, Lulus/Tidak lulus

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
// main()







/**
 * Menentukan grade berdasarkan nilai.
 * @param {number} nilai - Nilai siswa.
 * @returns {'A'|'B'|'C'|'D'} Grade (A, B, C, atau D).
 */
function tentukanGrade(nilai) {
    if (nilai >= 85) return 'A';
    if (nilai >= 70) return 'B';
    if (nilai >= 55) return 'C';
    return 'D';
}

/**
 * Menentukan status kelulusan siswa berdasarkan nilai dan batas kelulusan (BATAS_LULUS).
 *
 * @param {number} nilai - Nilai numerik siswa.
 * @returns {'Lulus'|'Tidak lulus'} Status kelulusan siswa.
 *
 * @example
 * tentukanStatus(80); // 'Lulus'
 * tentukanStatus(50); // 'Tidak lulus'
 */
function tentukanStatus(nilai) {
    return nilai >= BATAS_LULUS ? 'Lulus' : 'Tidak lulus';
}

/**
 * Memvalidasi apakah suatu nilai merupakan angka yang valid untuk nilai siswa.
 * Nilai dianggap valid jika berupa finite number dan berada pada rentang 0-100.
 *
 * @param {*} nilai - Nilai yang akan divalidasi (bisa dari tipe apa pun).
 * @returns {boolean} `true` jika nilai valid, `false` jika tidak.
 *
 * @example
 * nilaiValid(85);      // true
 * nilaiValid(101);     // false
 * nilaiValid('80');    // false
 * nilaiValid(NaN);     // false
 */
function nilaiValid(nilai) {
    return Number.isFinite(nilai) && nilai >= 0 && nilai <= 100;
}

/**
 * Menampilkan menu utama aplikasi Pengolah Nilai ke console.
 * Menu berisi opsi untuk input nilai, menampilkan statistik,
 * menampilkan predikat per siswa, dan keluar dari aplikasi.
 *
 * @returns {void}
 */
function tampilMenu() {
    console.log('\n===== PENGOLAH NILAI =====');
    console.log('1. Input nilai siswa');
    console.log('2. Tampilkan statistik');
    console.log('3. Tampilkan predikat per siswa');
    console.log('4. Keluar');
}

/**
 * Menampilkan informasi seorang siswa (nama dan nilai) ke console.
 *
 * @param {string} nama - Nama siswa.
 * @param {number} nilai - Nilai siswa.
 * @returns {void}
 *
 * @example
 * tampilSiswa('Budi', 85);
 * // Output: "Nama: Budi, Nilai: 85"
 */
function tampilSiswa(nama, nilai) {
    console.log(`Nama: ${nama}, Nilai: ${nilai}`);
}

console.assert(hitungRataRata([80, 90]) === 85, 'rata-rata 80,90 harus 85');
console.assert(hitungRataRata([]) === 0, 'rata-rata array kosong harus 0');
console.assert(tentukanGrade(85) === 'A', 'nilai 85 harus A');
console.assert(tentukanGrade(69) === 'C', 'nilai 69 harus C');
console.assert(nilaiValid(101) === false, '101 tidak valid');