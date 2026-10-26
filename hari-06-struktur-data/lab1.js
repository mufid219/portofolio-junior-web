const peserta = [
    { id: 1, nama: 'Sari', kelas: 'Web', nilai: 90, aktif: true },
    { id: 2, nama: 'Budi', kelas: 'Web', nilai: 68, aktif: true },
    { id: 3, nama: 'Citra', kelas: 'Data', nilai: 82, aktif: false },
    { id: 4, nama: 'Dedi', kelas: 'Web', nilai: 75, aktif: true },
    { id: 5, nama: 'Eka', kelas: 'Data', nilai: 88, aktif: true },
    { id: 6, nama: 'Fajar', kelas: 'Web', nilai: 55, aktif: false },
    { id: 7, nama: 'Gina', kelas: 'Data', nilai: 95, aktif: true },
    { id: 8, nama: 'Hana', kelas: 'Web', nilai: 72, aktif: true },
    { id: 9, nama: 'Irfan', kelas: 'Data', nilai: 64, aktif: false },
    { id: 10, nama: 'Joko', kelas: 'Web', nilai: 81, aktif: true }
];

// 1. Tampilkan peserta aktif saja (filter).
const pesertaAktif = peserta.filter(p => p.aktif)
console.log("Peserta Aktif:", pesertaAktif)

function getPesertaAktif(arr) {
    return arr.filter(p => p.aktif === true);
}

// 2. Urutkan berdasarkan nama (sort dengan localeCompare) tanpa mengubah array asli.
const pesertaTerurut = [...peserta].sort((a, b) => a.nama.localeCompare(b.nama))
console.log("Peserta Terurut:", pesertaTerurut)

function urutNama(arr) {
    return [...arr].sort((a, b) => a.nama.localeCompare(b.nama));
}

// 3. Cari peserta berdasarkan id (find) dan tangani bila tidak ditemukan.
const pesertaById = peserta.find(p => p.id === 12)
if (pesertaById) {
    console.log("Peserta ditemukan", pesertaById)
} else {
    console.log("Peserta tidak ditemukan.")
}

function cariById(arr, id) {
    const hasil = arr.find(p => p.id === id);
    if (!hasil) {
        return { ditemukan: false, data: null, pesan: `Peserta dengan id ${id} tidak ditemukan` };
    }
    return { ditemukan: true, data: hasil, pesan: `Ditemukan: ${hasil.nama}` };
}

// 4. Hitung jumlah peserta per kelas dengan objek penghitung.
const jumlahPerKelas = peserta.reduce((acc, p) => {
    acc[p.kelas] = (acc[p.kelas] || 0) + 1
    return acc
}, {})

console.log("Jumlah peserta per kelas: ", jumlahPerKelas)

function hitungPerKelas(arr) {
    const counter = {};
    for (const p of arr) {
        counter[p.kelas] = (counter[p.kelas] || 0) + 1;
    }
    return counter;
}

// 5. Tambah, ubah, dan hapus peserta (push, perubahan properti, filter atau splice) lalu cetak hasilnya.

// Tambah peserta baru
peserta.push({ id: 11, nama: 'Kiki', kelas: 'Web', nilai: 85, aktif: true })
console.log("Setelah menambahkan peserta: ", peserta)

// Ubah properti peserta
const pesertaToUpdate = peserta.find(p => p.id === 11)
if (pesertaToUpdate) {
    pesertaToUpdate.nilai = 95
}
console.log("Setelah mengubah nilai peserta: ", pesertaToUpdate)

// Hapus peserta
const pesertaToDelete = peserta.find(p => p.id === 11)
if (pesertaToDelete) {
    const index = peserta.indexOf(pesertaToDelete)
    peserta.splice(index, 1)
}
console.log("Setelah menghapus peserta : ", peserta)


function tambahPeserta(arr, dataBaru) {
    // validasi id unik
    if (arr.some(p => p.id === dataBaru.id)) {
        throw new Error(`ID ${dataBaru.id} sudah dipakai`);
    }
    arr.push(dataBaru);
    return arr;
}

function ubahPeserta(arr, id, perubahan) {
    const target = arr.find(p => p.id === id);
    if (!target) throw new Error(`ID ${id} tidak ditemukan`);
    Object.assign(target, perubahan);
    return target;
}

function hapusPeserta(arr, id) {
    const idx = arr.findIndex(p => p.id === id);
    if (idx === -1) throw new Error(`ID ${id} tidak ditemukan`);
    return arr.splice(idx, 1)[0]; // pakai splice agar array asli ikut berubah
}

// versi non-mutasi (mengembalikan array baru) untuk perbandingan
function hapusPesertaImmutable(arr, id) {
    return arr.filter(p => p.id !== id);
}

// 6. Ubah array menjadi objek berindeks id (reduce) sehingga pencarian berdasar id menjadi O(1).
const pesertaObjek = peserta.reduce((acc, p) => {
    acc[p.id] = p
    return acc
}, {})
console.log("Peserta sebagai Objek: ", pesertaObjek)

function toIndexById(arr) {
    return arr.reduce((acc, p) => {
        acc[p.id] = p;
        return acc;
    }, {});
}





/* ============================================================
 *                        UJI TIAP SOAL
 * ============================================================ */
/*
console.log('\n===== 1. Peserta aktif =====');
const aktif = getPesertaAktif(peserta);
console.table(aktif);
console.log('Jumlah aktif:', aktif.length); // 7

console.log('\n===== 2. Urut nama (tanpa mengubah asli) =====');
const terurut = urutNama(peserta);
console.table(terurut.map(p => ({ id: p.id, nama: p.nama })));
console.log('Array asli tetap:', peserta.map(p => p.nama).join(', '));

console.log('\n===== 3. Cari by id =====');
console.log(cariById(peserta, 5));   // ditemukan
console.log(cariById(peserta, 99));  // tidak ditemukan

console.log('\n===== 4. Hitung per kelas =====');
console.log(hitungPerKelas(peserta)); // { Web: 6, Data: 4 }

console.log('\n===== 5. CRUD =====');
// gunakan salinan agar array asli tetap aman untuk uji berikutnya
const kerja = peserta.map(p => ({ ...p }));

console.log('--- Tambah ---');
tambahPeserta(kerja, { id: 11, nama: 'Kiki', kelas: 'Web', nilai: 85, aktif: true });
console.log('Jumlah setelah tambah:', kerja.length); // 11

console.log('--- Ubah ---');
ubahPeserta(kerja, 2, { nilai: 78, aktif: false });
console.log('Peserta id 2:', kerja.find(p => p.id === 2));

console.log('--- Hapus (splice, mutasi) ---');
const dihapus = hapusPeserta(kerja, 6);
console.log('Dihapus:', dihapus);
console.log('Jumlah setelah hapus:', kerja.length); // 10

console.log('--- Hapus (filter, non-mutasi) ---');
const kerjaTanpaId3 = hapusPesertaImmutable(kerja, 3);
console.log('Jumlah tanpa id 3:', kerjaTanpaId3.length); // 9
console.log('Array kerja masih punya id 3?', kerja.some(p => p.id === 3)); // true

console.log('\n===== 6. Index by id (O(1)) =====');
const petaById = toIndexById(peserta);
console.log('Cari id 7 ->', petaById[7]);
console.log('Cari id 99 ->', petaById[99]); // undefined

// demo O(1) vs O(n)
console.time('O(1) lookup');
for (let i = 0; i < 1_000_000; i++) petaById[5];
console.timeEnd('O(1) lookup');

console.time('O(n) find');
for (let i = 0; i < 1_000_000; i++) peserta.find(p => p.id === 5);
console.timeEnd('O(n) find');
*/