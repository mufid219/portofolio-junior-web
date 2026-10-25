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

// Tugas

// 1. Tabel perkalian 1 sampai 10 (perulangan bersarang).
// tabel perkalian 1-10
for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
}

// 2. Pola segitiga bintang dan piramida; bentuk persegi angka.
// segitiga bintang
for (let i = 1; i <= 5; i++) {
    let baris = "";
    for (let j = 1; j <= i; j++) {
        baris += "*";
    }
    console.log(baris);
}

// segitiga piramida
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

// Persegi angka
const sisi = 5;
for (let baris = 1; baris <= sisi; baris++) {
    let teks = '';
    for (let kolom = 1; kolom <= sisi; kolom++) {
        teks += kolom;
    }
    console.log(teks);
}

// 3. FizzBuzz 1-50 (kelipatan 3 = Fizz, 5 = Buzz, keduanya = FizzBuzz).
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

// 4. Jumlah digit dari sebuah angka (mis. 4821 menjadi 15) memakai while, %, dan Math.floor.
let deklarasiAngka = 4821;
let jumlah = 0;
let sisa = Math.abs(deklarasiAngka); // handle negative
while (sisa > 0) {
    jumlah += sisa % 10;
    sisa = Math.floor(sisa / 10);
}
console.log(`Jumlah digit ${deklarasiAngka} = ${jumlah}`);

// 5. Tebak angka: komputer memilih angka acak Math.floor(Math.random() * 100) + 1; pengguna menebak hingga benar dengan petunjuk lebih tinggi / rendah(do...while).

// latihan-tebak.js — jalankan: node latihan-tebak.js

let angka = Math.floor(Math.random() * 100) + 1; //jalankan di console browser
let input;
do {
    input = parseInt(prompt("Masukkan angka: "));
    if (input < angka) {
        console.log("Angka terlalu kecil");
    } else if (input > angka) {
        console.log("Angka terlalu besar");
    } else {
        console.log("Benar!");
    }
} while (angka !== input)
