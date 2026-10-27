var d = [80, 65, 90];
function f(a) { var s = 0; for (var i = 0; i < a.length; i++) { s = s + a[i] } return s / a.length }
function g(x) {
    if (x >= 85) { return 'A' } else {
        if (x >= 70) { return 'B' } else {
            if (x >= 55) {
                return
                'C'
            } else { return 'D' }
        }
    }
}
var r = f(d);
if (r == 80) { console.log('bagus') }
function h(n) { var p = n * 0.11; return n + p }
function k(n) { var p = n * 0.11; return n + p }
console.log(g(r))

//buat versi baik dari kode di atas, misal dengan menambahkan komentar, memberi nama variabel yang jelas, dan memisahkan fungsi menjadi beberapa baris.
var scores = [80, 65, 90];

// Fungsi untuk menghitung rata-rata dari array
function calculateAverage(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum / array.length;
}


// Fungsi untuk menentukan grade berdasarkan nilai rata-rata
function determineGrade(averageScore) {
    if (averageScore >= 85) {
        return 'A';
    } else if (averageScore >= 70) {
        return 'B';
    } else if (averageScore >= 55) {
        return 'C';
    } else {
        return 'D';
    }
}

if (average == 80) {
    console.log('bagus');
}
var average = calculateAverage(scores);
console.log(determineGrade(average));

/*
// Versi bersih
const PAJAK = 0.11;
const BATAS_GRADE = { A: 85, B: 70, C: 55 };
function hitungRataRata(daftarNilai) {
    if (daftarNilai.length === 0) return 0;
    const jumlah = daftarNilai.reduce((total, nilai) => total + nilai, 0);
    return jumlah / daftarNilai.length;
}
function tentukanGrade(nilai) {
    if (nilai >= BATAS_GRADE.A) return 'A';
    if (nilai >= BATAS_GRADE.B) return 'B';
    if (nilai >= BATAS_GRADE.C) return 'C';
    return 'D';
}
function hitungHargaDenganPajak(harga) {
    return harga * (1 + PAJAK);
}

// mencoba fungsi
console.log("Rata-rata:", hitungRataRata(scores))
console.log("Grade:", tentukanGrade(hitungRataRata(scores)))
console.log("Harga dengan pajak:", hitungHargaDenganPajak(100))
*/

/**
 * Konstanta untuk perhitungan nilai dan pajak
 */
const PAJAK = 0.11;
const BATAS_GRADE = { A: 85, B: 70, C: 55 };
const NILAI_TARGET_BAGUS = 80;

/**
 * Menghitung nilai rata-rata dari sebuah daftar nilai.
 * @param {number[]} daftarNilai - Array berisi angka-angka nilai.
 * @returns {number} Nilai rata-rata atau 0 jika array kosong.
 */
function hitungRataRata(daftarNilai) {
    if (!daftarNilai || daftarNilai.length === 0) {
        return 0;
    }

    let total = 0;
    for (let i = 0; i < daftarNilai.length; i++) {
        total += daftarNilai[i];
    }
    return total / daftarNilai.length;
}

/**
 * Menentukan grade berdasarkan nilai rata-rata menggunakan guard clause.
 * @param {number} nilai - Nilai rata-rata.
 * @returns {string} Grade (A, B, C, atau D).
 */
function tentukanGrade(nilai) {
    if (nilai >= BATAS_GRADE.A) return 'A';
    if (nilai >= BATAS_GRADE.B) return 'B';
    if (nilai >= BATAS_GRADE.C) return 'C';
    return 'D';
}

/**
 * Menghitung total harga setelah ditambah pajak (Menggantikan fungsi h dan k yang duplikat).
 * @param {number} harga - Harga awal.
 * @returns {number} Total harga setelah pajak.
 */
function hitungHargaDenganPajak(harga) {
    const pajak = harga * TARIF_PAJAK;
    return harga + pajak;
}

// Eksekusi Program Utama
const daftarNilai = [80, 65, 90];
const rataRataNilai = hitungRataRata(daftarNilai);

if (rataRataNilai === NILAI_TARGET_BAGUS) {
    console.log('bagus');
}

console.log(tentukanGrade(rataRataNilai));