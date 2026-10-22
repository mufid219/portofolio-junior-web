// Faktorial
const n = 5;
let faktorial = 1;
for (let i = 2; i <= n; i++) {
    faktorial *= i;
}
console.log(`${n}! = ${faktorial}`);
// Fibonacci 10 suku pertama
let a = 0;
let b = 1;
const hasil = [];
for (let i = 0; i < 10; i++) {
    hasil.push(a);
    [a, b] = [b, a + b];
}
console.log(hasil.join(', '));

// Bilangan prima sampai 50
for (let angka = 2; angka <= 50; angka++) {
    let prima = true;
    for (let pembagi = 2; pembagi * pembagi <= angka; pembagi++) {
        if (angka % pembagi === 0) {
            prima = false;
            break;
        }
    }
    if (prima) console.log(angka);
}

// tabel perkalian 1-10
// Versi tabel sederhana
// for (let i = 1; i <= 10; i++) {
//     const baris = [];
//     for (let j = 1; j <= 10; j++) {
//         baris.push(String(i * j).padStart(4, " "));
//     }
//     console.log(baris.join(""));
// }
for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
}

// segitiga bintang
for (let i = 1; i <= 5; i++) {
    let baris = "";
    for (let j = 1; j <= i; j++) {
        baris += "*";
    }
    console.log(baris);
}

// segitiga piramid
for (let i = 1; i <= 5; i++) {
    let baris = "";
    for (let j = 1; j <= 5 - i; j++) {
        baris += " ";
    }
    for (let j = 1; j <= 2 * i - 1; j++) {
        baris += "*";
    }
    console.log(baris);
}

// FizzBuzz 1-50
for (let i = 1; i <= 50; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

function jumlahDigit(angka) {
    let n = Math.abs(angka);   // tangani negatif
    let jumlah = 0;

    while (n > 0) {
        jumlah += n % 10;        // ambil digit terakhir
        n = Math.floor(n / 10);  // buang digit terakhir
    }
    return jumlah;
}

console.log(jumlahDigit(4821));   // 15
console.log(jumlahDigit(12345));  // 15
console.log(jumlahDigit(9));      // 9
console.log(jumlahDigit(-4821));  // 15

// latihan-tebak.js — jalankan: node latihan-tebak.js
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

const rahasia = Math.floor(Math.random() * 100) + 1;
let percobaan = 0;
let tebakan;

console.log("🎯 Saya memilih angka 1–100. Coba tebak!");
console.log("   (simpan salinan ini untuk uji: rahasia =", rahasia, ")\n");

do {
    tebakan = Number(await rl.question("Tebakanmu: "));
    percobaan++;

    if (Number.isNaN(tebakan) || tebakan < 1 || tebakan > 100) {
        console.log("⚠️  Masukkan angka bulat 1–100.\n");
        percobaan--;   // input tidak valid tidak dihitung
    } else if (tebakan < rahasia) {
        console.log("⬆️  Terlalu rendah! Coba lebih tinggi.\n");
    } else if (tebakan > rahasia) {
        console.log("⬇️  Terlalu tinggi! Coba lebih rendah.\n");
    }
} while (tebakan !== rahasia);

console.log(`✅ Benar! Angkanya ${rahasia}. Kamu menebak dalam ${percobaan} percobaan.`);
rl.close();

// menebak angka random
let angka = Math.floor(Math.random() * 100) + 1;
let input
do {
    input = parseInt(prompt("Masukan angka: "))
    if (input < angka) {
        console.log("Angka terlalu kecil")
    } else if (input > angka) {
        console.log("angka terlalu besar")
    } else {
        console.log("Benar!")
    }
} while (angka !== input)