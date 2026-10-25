// Lab 1

let nama = "Mufid Isnan Ardianto";
let umur = 29;
let tinggiBadan = 1.7;
let statusAktif = true;

console.log(nama, umur, tinggiBadan, statusAktif);
console.log(`Halo, ${nama}! Umur ${umur} tahun.`);
console.log(`Tinggi badan: ${tinggiBadan} m, Status aktif: ${statusAktif}`);

// cek tipe data
console.log(typeof 42); // 'number'
console.log(typeof 'teks'); // 'string'
console.log(typeof true); // 'boolean'
console.log(typeof undefined); // 'undefined'
console.log(typeof null); // 'object'

console.log('5' + 3);
console.log('5' * 3);
console.log(0.1 + 0.2);
console.log(Number('abc'));
console.log(10 / 3);
console.log(10 % 3);
console.log(2 ** 10);

// Program menghitung luas dan keliling lingkaran
const jari = 10;

const luasLingkaran = Math.PI * jari ** 2;
const kelilingLingkaran = 2 * Math.PI * jari;

console.log(`Luas lingkaran dengan jari-jari ${jari} adalah ${luasLingkaran}`);
console.log(`Keliling lingkaran dengan jari-jari ${jari} adalah ${kelilingLingkaran}`);

// Program menghitung jumlah detik dalam 1 hari
const detikSehari = 24 * 60 * 60;
console.log(`Jumlah detik dalam 1 hari : ${detikSehari} detik`);

// Program konversi suhu dari Celcius ke Fahrenheit
const celcius = 25;
const fahrenheit = (celcius * 9 / 5) + 32;
console.log(`${celcius}°C = ${fahrenheit}°F`);


