const peserta = [
    { id: 1, nama: 'Sari', kelas: 'Web', nilai: 90 },
    { id: 2, nama: 'Budi', kelas: 'Web', nilai: 68 },
    { id: 3, nama: 'Citra', kelas: 'Data', nilai: 82 },
    { id: 4, nama: 'Fajar', kelas: 'Web', nilai: 50 },
    { id: 5, nama: 'Nanang', kelas: 'Web', nilai: 72 },
    { id: 6, nama: 'Yoko', kelas: 'Data', nilai: 67 },
    { id: 7, nama: 'Riri', kelas: 'Data', nilai: 60 },
    { id: 8, nama: 'Yuda', kelas: 'Data', nilai: 85 },

];
const namaWeb = peserta.filter((p) => p.kelas === 'Web').map((p) => p.nama);
const rata = peserta.reduce((j, p) => j + p.nilai, 0) / peserta.length;
const budi = peserta.find((p) => p.nama === 'Budi');
const urutNilai = [...peserta].sort((a, b) => b.nilai - a.nilai);
// Menghitung jumlah per kelas
const perKelas = {};
for (const p of peserta) {
    perKelas[p.kelas] = (perKelas[p.kelas] || 0) + 1;
}

// console.log(namaWeb)
// console.log(rata)
// console.log(budi)
// console.log(urutNilai)
// console.log(perKelas)

// Daftar nama peserta yang lulus (Filter dan map)
const pesertaLulus = peserta.filter((p) => p.nilai > 70).map((p) => p.nama)
console.log("Daftar peserta yang lulus: ", pesertaLulus)

// Rata-rata nilai per kelas
const rataWeb = peserta.filter((p) => p.kelas === 'Web').reduce((j, p) => j + p.nilai, 0) / peserta.filter((p) => p.kelas === "Web").length;
const rataData = peserta.filter((p) => p.kelas === 'Data').reduce((j, p) => j + p.nilai, 0) / peserta.filter((p) => p.kelas === "Data").length;
console.log("Rata-rata nilai peserta kelas web: ", rataWeb)
console.log("Rata-rata nilai peserta kelas data: ", rataData)

// Peserta dengan nilai tertinggi (reduce atau sort)
const pesertaTertinggi = peserta.reduce((max, p) => (p.nilai > max.nilai ? p : max), peserta[0])
console.log("Peserta dengan nilai tertinggi: ", pesertaTertinggi)

// Pencarian peserta  berdasarkan sebagian nama (filter dan includes, tidak peka huruf besar-kecil)
const pesertaCari = peserta.filter((p) => p.nama.toLowerCase().includes("budi".toLowerCase()))
console.log("Peserta dengan nama mengandung 'budi': ", pesertaCari)

// Daftar peringkat (sort pada salinan array) dengan nomor urut.
const pesertaPeringkat = [...peserta].sort((a, b) => b.nilai - a.nilai).map((p, index) => ({
    peringkat: index + 1,
    nama: p.nama,
    nilai: p.nilai
}))
console.log("Daftar peringkat peserta: ", pesertaPeringkat)