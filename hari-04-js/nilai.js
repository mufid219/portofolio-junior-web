const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const NILAI_MIN = 0;
const NILAI_MAKS = 100;
const BATAS_LULUS = 70;

// Batas nilai untuk grade
const BATAS_GRADE_A = 85;
const BATAS_GRADE_B = 70;
const BATAS_GRADE_C = 55;

async function main() {
    const rl = readline.createInterface({ input, output });
    const daftarNama = [];
    const daftarNilai = [];
    let jalan = true;

    while (jalan) {
        console.log('\n===== PENGOLAH NILAI =====');
        console.log('1. Input nilai siswa');
        console.log('2. Tampilkan statistik');
        console.log('3. Tampilkan predikat per siswa');
        console.log('4. Keluar');

        const pilihan = (await rl.question('Pilih menu (1-4): ')).trim();

        switch (pilihan) {
            case '1': {
                const nama = (await rl.question('Nama siswa: ')).trim();
                const nilai = Number(await rl.question(`Nilai (${NILAI_MIN}-${NILAI_MAKS}): `));

                // TODO: validasi nama tidak kosong dan nilai 0-100 (Number.isNaN)

                // Validasi nama tidak kosong
                if (nama === '') {
                    console.log('Error: nama siswa tidak boleh kosong.');
                    break;
                }
                // Validasi nilai berupa angka dan dalam rentang
                if (Number.isNaN(nilai)) {
                    console.log('Error: nilai harus berupa angka.');
                    break;
                }
                if (nilai < NILAI_MIN || nilai > NILAI_MAKS) {
                    console.log(`Error: nilai harus di antara ${NILAI_MIN} dan ${NILAI_MAKS}.`);
                    break;
                }

                // TODO: jika valid, push ke daftarNama dan daftarNilai

                daftarNama.push(nama);
                daftarNilai.push(nilai);
                console.log(`Data siswa "${nama}" (${nilai}) berhasil ditambahkan.`);
                break;
            }

            case '2': {
                // TODO: jika kosong tampilkan pesan; jika ada hitung rata-rata,
                // nilai tertinggi, dan nilai terendah dengan perulangan

                if (daftarNilai.length === 0) {
                    console.log('Belum ada data siswa.');
                    break;
                }

                // Hitung statistik dengan perulangan
                let total = 0;
                let tertinggi = daftarNilai[0];
                let terendah = daftarNilai[0];
                let jumlahLulus = 0;
                let jumlahTidakLulus = 0;

                for (let i = 0; i < daftarNilai.length; i++) {
                    total += daftarNilai[i];
                    if (daftarNilai[i] > tertinggi) tertinggi = daftarNilai[i];
                    if (daftarNilai[i] < terendah) terendah = daftarNilai[i];
                    if (daftarNilai[i] >= BATAS_LULUS) jumlahLulus++;
                    else jumlahTidakLulus++;
                }

                const rataRata = total / daftarNilai.length;

                console.log(`Jumlah siswa : ${daftarNilai.length}`);
                console.log(`Rata-rata    : ${rataRata.toFixed(2)}`);
                console.log(`Tertinggi    : ${tertinggi}`);
                console.log(`Terendah     : ${terendah}`);
                console.log(`Lulus        : ${jumlahLulus}`);
                console.log(`Tidak lulus  : ${jumlahTidakLulus}`);


                break;
            }

            case '3': {
                // TODO: for dengan indeks; tampilkan nama, nilai, grade A/B/C/D, Lulus/Tidak lulus

                if (daftarNilai.length === 0) {
                    console.log('Belum ada data siswa.');
                    break;
                }

                // Bubble sort manual: urutkan dari nilai tertinggi (tantangan tambahan)
                // Buat salinan agar urutan asli tetap
                const namaUrut = daftarNama.slice();
                const nilaiUrut = daftarNilai.slice();

                for (let i = 0; i < nilaiUrut.length - 1; i++) {
                    for (let j = 0; j < nilaiUrut.length - 1 - i; j++) {
                        if (nilaiUrut[j] < nilaiUrut[j + 1]) {
                            // tukar nilai
                            const tempNilai = nilaiUrut[j];
                            nilaiUrut[j] = nilaiUrut[j + 1];
                            nilaiUrut[j + 1] = tempNilai;
                            // tukar nama
                            const tempNama = namaUrut[j];
                            namaUrut[j] = namaUrut[j + 1];
                            namaUrut[j + 1] = tempNama;
                        }
                    }
                }

                console.log('\nPredikat per siswa (dari nilai tertinggi):');
                for (let i = 0; i < namaUrut.length; i++) {
                    const n = nilaiUrut[i];
                    let grade;
                    if (n >= BATAS_GRADE_A) grade = 'A';
                    else if (n >= BATAS_GRADE_B) grade = 'B';
                    else if (n >= BATAS_GRADE_C) grade = 'C';
                    else grade = 'D';

                    const status = n >= BATAS_LULUS ? 'Lulus' : 'Tidak Lulus';
                    console.log(`  ${i + 1}. ${namaUrut[i]} - ${n} - Grade ${grade} - ${status}`);
                }
                break;
            }

            case '4':
                jalan = false;
                console.log('Terima kasih.');
                break;

            default:
                console.log('Pilihan tidak valid. Masukkan 1-4.');
        }
    }

    rl.close();
}

main();