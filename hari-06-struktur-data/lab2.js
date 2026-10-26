// 1. Hitung frekuensi kata dari kalimat 'saya belajar web saya suka web' memakai Map, lalu tampilkan terurut dari yang paling sering.

const kalimat = "saya belajar web saya suka web"
const kataArray = kalimat.split(' ');
const frekuensiMap = new Map();

kataArray.forEach(kata => {
    frekuensiMap.set(kata, (frekuensiMap.get(kata) || 0) + 1)
})

const frekuensiTerurut = [...frekuensiMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map((kata, frekuensi) => `${kata}: ${frekuensi}`)

console.log("Frekuensi Kata (Terurut): ", frekuensiTerurut)

// Jumlah kata semua kata dalam kalimat
const jumlahKata = kataArray.length
console.log("Jumlah kata : ", jumlahKata)

// 2. Hilangkan duplikat dari daftar email memakai Set, tampilkan sebelum dan sesudah.
const emails = [
    "user1@example.com",
    "user2@example.com",
    "user1@example.com",
    "user3@example.com",
]

console.log("Sebelum hilangkan duplikat : ", emails)

const emailUnik = [...new Set(emails)]
console.log("Setelah hilangkan duplikat : ", emailUnik)


// 3. Cari irisan dua daftar peserta (kelas A dan kelas B) memakai Set.

const kelasA = new Set(["Sari", "Budi", "Citra"])
const kelasB = new Set(["Budi", "Dewi", "Eka"])
const irisan = [...kelasA].filter(nama => kelasB.has(nama))
console.log("Irisan kelas A dan B : ", irisan)

// 4. Buat fungsi adaDuplikat(daftar) (versi Set) dan uji dengan array kosong, satu elemen, dan elemen berulang.

function adaDuplikat(daftar) {
    return new Set(daftar).size !== daftar.length
}

console.log("Array kosong : ", adaDuplikat([]))     // false
console.log("Satu elemen : ", adaDuplikat(["Sari"]))     // false
console.log("Elemen berulang : ", adaDuplikat(["Sari", "Budi", "Sari"]))     // true
