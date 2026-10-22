// Lab 2
/*
// Program A: konversi nilai ke huruf
const nilai = Number(prompt('Nilai (0-100):'));
let grade;
if (nilai >= 85) grade = 'A';
else if (nilai >= 70) grade = 'B';
else if (nilai >= 55) grade = 'C';
else grade = 'D';
console.log(`Grade: ${grade}`);
// Program B: tahun kabisat
const tahun = Number(prompt('Tahun:'));
const kabisat = (tahun % 4 === 0 && tahun % 100 !== 0) || tahun % 400 === 0;
console.log(kabisat ? 'Kabisat' : 'Bukan kabisat');
*/

/*
Kerjakan program berikut dengan flowchart atau pseudocode terlebih dahulu:
1. Penentu bilangan ganjil/genap dan positif/negatif/nol.
2. Tarif parkir: 2 jam pertama Rp3.000, tiap jam berikutnya Rp2.000, maksimum Rp15.000 per hari.
3. Kalkulator sederhana dengan switch (+, -, *, /) dan penanganan pembagian dengan nol.
4. Penentu kategori BMI (berat / (tinggi * tinggi)): kurang (di bawah 18,5), normal
(18,5-24,9), lebih (25-29,9), obesitas (30 ke atas).
*/
/*
MULAI
  INPUT n
  // Cek ganjil/genap
  JIKA n mod 2 = 0 MAKA
     cetak "Genap"
  SELAIN ITU
     cetak "Ganjil"
  // Cek tanda
  JIKA n > 0 MAKA
     cetak "Positif"
  SELAIN JIKA n < 0 MAKA
     cetak "Negatif"
  SELAIN ITU
     cetak "Nol"
SELESAI
*/
/*
function cekBilangan(n) {
    if (!Number.isInteger(n)) {
        return "Input harus bilangan bulat";
    }

    const jenis = n % 2 === 0 ? "Genap" : "Ganjil";
    let tanda;
    if (n > 0) tanda = "Positif";
    else if (n < 0) tanda = "Negatif";
    else tanda = "Nol";

    return `${n} => ${jenis}, ${tanda}`;
}

console.log(cekBilangan(7));    // 7 → Ganjil, Positif
console.log(cekBilangan(-4));   // -4 → Genap, Negatif
console.log(cekBilangan(0));    // 0 → Genap, Nol
*/

let nilai, status1, status2;
nilai = -1

if (nilai % 2 === 0) {
    status1 = "genap"
} else {
    status1 = "ganjil"
}

console.log(status1)

if (nilai > 0) {
    status2 = "positif"
} else if (nilai < 0) {
    status2 = "negatif"
} else {
    status2 = "nol"
}

console.log(status2)



let durasiJam, sisaJam, totalHari, bayar
durasiJam = 30
sisaJam = durasiJam % 24
// totalHari = (durasiJam - sisaJam) / 24
totalHari = Math.floor(durasiJam / 24)
if (sisaJam <= 2) {
    bayar = 3000
} else {
    bayar = 3000 + (sisaJam - 2) * 2000
}
if (bayar >= 15000) {
    bayar = 15000
}
bayar = totalHari * 15000 + bayar
console.log(bayar)

let nilai1, nilai2, pilih, hasil;
nilai1 = 10
nilai2 = 2
pilih = '/'
switch (pilih) {
    case '+':
        hasil = nilai1 + nilai2
        break;
    case '-':
        hasil = nilai1 - nilai2
        break;
    case '*':
        hasil = nilai1 * nilai2
        break;
    case '/':
        if (nilai2 === 0) {
            hasil = "tidak terdefinisi"
        } else {

            hasil = nilai1 / nilai2
        }
        break;
    default:
        hasil = "Operator tidak valid"
        break;
}
console.log(hasil)


let berat, tinggi, BMI, statusAkhir
berat = 83
tinggi = 1.70
BMI = berat / (tinggi * tinggi)
if (BMI < 18.5) {
    statusAkhir = "kurang"
} else if (BMI <= 24.9) {
    statusAkhir = "normal"
} else if (BMI <= 29.9) {
    statusAkhir = "lebih"
} else {
    statusAkhir = "obesitas"
}

console.log(statusAkhir)

