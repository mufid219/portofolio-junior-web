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

// 1. Penentu bilangan ganjil/genap dan positif/negatif/nol.
/*
MULAI
  BACA angka
  angka ← konversi_ke_bilangan(angka)

  // Tentukan jenis (ganjil / genap)
  JIKA angka MOD 2 = 0 MAKA
    jenis ← "Genap"
  SELAIN ITU
    jenis ← "Ganjil"
  AKHIR JIKA

  // Tentukan tanda (positif / negatif / nol)
  JIKA angka > 0 MAKA
    tanda ← "Positif"
  SELAIN JIKA angka < 0 MAKA
    tanda ← "Negatif"
  SELAIN ITU
    tanda ← "Nol"
  AKHIR JIKA

  TAMPILKAN angka, "adalah bilangan", jenis, "dan", tanda
SELESAI
*/

const angka = Number(prompt('Masukkan sebuah bilangan:'));

let jenis;
if (angka % 2 === 0) jenis = 'Genap';
else jenis = 'Ganjil';

let tanda;
if (angka > 0) tanda = 'Positif';
else if (angka < 0) tanda = 'Negatif';
else tanda = 'Nol';

console.log(`${angka} adalah bilangan ${jenis} dan ${tanda}`);

// 2. Tarif parkir: 2 jam pertama Rp3.000, tiap jam berikutnya Rp2.000, maksimum Rp15.000 per hari.

/*
MULAI
  BACA lama_jam
  lama_jam ← konversi_ke_bilangan(lama_jam)

  JIKA lama_jam ≤ 0 MAKA
    TAMPILKAN "Durasi parkir tidak valid"
  SELAIN ITU
    JIKA lama_jam ≤ 2 MAKA
      biaya ← 3000
    SELAIN ITU
      biaya ← 3000 + (lama_jam - 2) × 2000
    AKHIR JIKA

    // Terapkan batas maksimum per hari
    JIKA biaya > 15000 MAKA
      biaya ← 15000
    AKHIR JIKA

    TAMPILKAN "Lama parkir:", lama_jam, "jam"
    TAMPILKAN "Total biaya: Rp", biaya
  AKHIR JIKA
SELESAI
*/

const lamaJam = Number(prompt('Lama parkir (jam):'));

if (lamaJam <= 0) {
    console.log('Durasi parkir tidak valid');
} else {
    let biaya;
    if (lamaJam <= 2) biaya = 3000;
    else biaya = 3000 + (lamaJam - 2) * 2000;

    if (biaya > 15000) biaya = 15000;

    console.log(`Lama parkir: ${lamaJam} jam`);
    console.log(`Total biaya: Rp${biaya}`);
}

// 3. Kalkulator sederhana dengan switch (+, -, *, /) dan penanganan pembagian dengan nol.

/*
MULAI
  BACA angka1, operator, angka2
  angka1 ← konversi_ke_bilangan(angka1)
  angka2 ← konversi_ke_bilangan(angka2)

  hasil ← kosong

  SWITCH operator
    KASUS "+": hasil ← angka1 + angka2
    KASUS "-": hasil ← angka1 - angka2
    KASUS "*": hasil ← angka1 × angka2
    KASUS "/":
      JIKA angka2 = 0 MAKA
        TAMPILKAN "Error: pembagian dengan nol tidak terdefinisi"
        KELUAR
      SELAIN ITU
        hasil ← angka1 ÷ angka2
      AKHIR JIKA
    KASUS LAINNYA:
      TAMPILKAN "Operator tidak dikenal"
      KELUAR
  AKHIR SWITCH

  TAMPILKAN angka1, operator, angka2, "=", hasil
SELESAI
*/

const angka1 = Number(prompt('Angka pertama:'));
const operator = prompt('Operator (+, -, *, /):');
const angka2 = Number(prompt('Angka kedua:'));

let hasil;

switch (operator) {
    case '+':
        hasil = angka1 + angka2;
        break;
    case '-':
        hasil = angka1 - angka2;
        break;
    case '*':
        hasil = angka1 * angka2;
        break;
    case '/':
        if (angka2 === 0) {
            console.log('Error: pembagian dengan nol tidak terdefinisi');
            hasil = null;
        } else {
            hasil = angka1 / angka2;
        }
        break;
    default:
        console.log('Operator tidak dikenal');
        hasil = null;
}

if (hasil !== null) {
    console.log(`${angka1} ${operator} ${angka2} = ${hasil}`);
}

// 4. Penentu kategori BMI (berat / (tinggi * tinggi)): kurang (di bawah 18,5), normal (18,5-24,9), lebih (25-29,9), obesitas (30 ke atas).

/*
MULAI
  BACA berat, tinggi
  berat  ← konversi_ke_bilangan(berat)
  tinggi ← konversi_ke_bilangan(tinggi)

  JIKA berat ≤ 0 ATAU tinggi ≤ 0 MAKA
    TAMPILKAN "Berat dan tinggi harus lebih dari nol"
  SELAIN ITU
    bmi ← berat ÷ (tinggi × tinggi)

    JIKA bmi < 18.5 MAKA
      kategori ← "Kurang"
    SELAIN JIKA bmi < 25 MAKA       // 18.5 ≤ bmi < 25
      kategori ← "Normal"
    SELAIN JIKA bmi < 30 MAKA       // 25 ≤ bmi < 30
      kategori ← "Lebih"
    SELAIN ITU                       // bmi ≥ 30
      kategori ← "Obesitas"
    AKHIR JIKA

    TAMPILKAN "BMI:", bulatkan(bmi, 1), "→", kategori
  AKHIR JIKA
SELESAI
*/

const berat = Number(prompt('Berat badan (kg):'));
const tinggi = Number(prompt('Tinggi badan (meter, contoh: 1.70):'));

if (berat <= 0 || tinggi <= 0) {
    console.log('Berat dan tinggi harus lebih dari nol');
} else {
    const bmi = berat / (tinggi * tinggi);

    let kategori;
    if (bmi < 18.5) kategori = 'Kurang';
    else if (bmi < 25) kategori = 'Normal';
    else if (bmi < 30) kategori = 'Lebih';
    else kategori = 'Obesitas';

    console.log(`BMI: ${bmi.toFixed(1)} → ${kategori}`);
}

// MATERI DIKELAS

/*
Penentu bilangan ganjil/genap dan positif/negatif/nol.
0.start, let nilai, status1, status2
1.input nilai
2.if (nilai % 2)===0 {status1="genap"}else{status1="ganjil"}
3.cetak (status1)
4.if(nilai > 0) {status2="positif"}else
     if(nilai < 0) {status2 ="negatif"} else {status2="nol"}
5.cetak (status2)
6.end  */

/*
let nilai, status1, status2;
nilai = -1; // Contoh nilai, bisa diganti sesuai kebutuhan
if (nilai % 2 === 0) {
    status1 = "genap";
} else {
    status1 = "ganjil";
}
console.log(status1);
if (nilai > 0) {
    status2 = "positif";
} else if (nilai < 0) {
    status2 = "negatif";
} else {
    status2 = "nol";
}
console.log(status2);
*/

/* 
Tarif parkir: 2 jam pertama Rp3.000, tiap jam berikutnya Rp2.000, maksimum Rp15.000 per hari.
0.start , let durasijam, sisajam, totalhari, bayar
1.input durasijam
2.sisajam=durasijam%24
3.totalhari=(durasijam-sisahari)/24
4.if(sisajam<=2){bayar=3000}else{bayar=3000+(sisajam-2)*2000}
5.if(bayar>=15000){bayar=15000}
6.bayar=totalhari*15000+bayar
7.cetak (bayar)
8.end
*/

/*
let durasijam, sisajam, totalhari, bayar;
durasijam = 30;
sisajam = durasijam % 24;
totalhari = Math.floor(durasijam / 24); // Menggunakan Math.floor untuk mendapatkan jumlah hari penuh
//totalhari = (durasijam - sisajam) / 24;
if (sisajam <= 2) {
    bayar = 3000;
} else {
    bayar = 3000 + (sisajam - 2) * 2000;
}
if (bayar >= 15000) {
    bayar = 15000;
}
bayar = totalhari * 15000 + bayar;
console.log(bayar);
*/

/*
Kalkulator sederhana dengan switch (+, -, *, /) dan penanganan pembagian dengan nol.
0.start, let nilai1,nilai2,pilih, hasil
1.output("menu pilihan (+, -, *, /)")
2.input (nilai1,nilai2,pilih)
3.switch(pilih)
  case 1 : hasil=nilai1+nilai2
  case 2 : hasil=nilai1-nilai2
  case 3 : hasil=nilai1*nilai2
  case 4 : if(nilai2===0){hasil="tidak terdefinisi"}else{hasil=nilai1/nilai2}
4.cetak (hasil)
5. end
*/

/*
let nilai1, nilai2, pilih, hasil;
nilai1 = 10;
nilai2 = 0;
pilih = "/"; // Contoh operator, bisa diganti sesuai kebutuhan
switch (pilih) {
    case "+":
        hasil = nilai1 + nilai2;
        break;
    case "-":
        hasil = nilai1 - nilai2;
        break;
    case "*":
        hasil = nilai1 * nilai2;
        break;
    case "/":
        if (nilai2 === 0) {
            hasil = "tidak terdefinisi";
        } else {
            hasil = nilai1 / nilai2;
        }
        break;
    default:
        hasil = "Operator tidak valid";
}
console.log(hasil);
*/

/*
Penentu kategori BMI (berat / (tinggi * tinggi)): 
kurang (di bawah 18,5), normal (18,5-24,9), lebih (25-29,9), obesitas (30 ke atas).
0.start, let berat, tinggi, BMI, status
1.input (berat, tinggi)
2.BMI = berat / (tinggi * tinggi)
3. if(BMI<18,5){statusSehat="kurang"}else
      if(BMI<=24,9) {statusSehat="normal"}else
        if(BMI<=29,9) {statusSehat="lebih"}else{statusSehat="obesitas"}
4.output (statusSehat)
5.end
*/

/*
let berat, tinggi, BMI, statusSehat;
berat = 74;
tinggi = 1.70;
BMI = berat / (tinggi * tinggi);
if (BMI < 18.5) {
    statusSehat = "kurang";
} else if (BMI <= 24.9) {
    statusSehat = "normal";
} else if (BMI <= 29.9) {
    statusSehat = "lebih";
} else {
    statusSehat = "obesitas";
}
console.log(statusSehat);

*/