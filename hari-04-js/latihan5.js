const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

// Konstanta aturan nilai dan predikat
const NILAI_MIN = 0;
const NILAI_MAKS = 100;
const BATAS_LULUS = 70;

// Konstanta ambang batas grade
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
                const inputNilai = await rl.question('Nilai (0-100): ');
                const nilai = Number(inputNilai);

                // Validasi: Nama tidak boleh kosong dan nilai harus angka antara 0 - 100
                if (nama === '') {
                    console.log(' Error: Nama siswa tidak boleh kosong.');
                } else if (Number.isNaN(nilai) || inputNilai.trim() === '' || nilai < NILAI_MIN || nilai > NILAI_MAKS) {
                    console.log(` Error: Nilai harus berupa angka valid antara ${NILAI_MIN} hingga ${NILAI_MAKS}.`);
                } else {
                    // Simpan data jika valid
                    daftarNama.push(nama);
                    daftarNilai.push(nilai);
                    console.log(` Data siswa ${nama} berhasil ditambahkan.`);
                }
                break;
            }

            case '2': {
                // Cek jika data siswa masih kosong
                if (daftarNama.length === 0) {
                    console.log(' Belum ada data siswa. Silakan input data terlebih dahulu (Menu 1).');
                } else {
                    let totalNilai = 0;
                    let nilaiTertinggi = daftarNilai[0];
                    let nilaiTerendah = daftarNilai[0];
                    let jumlahLulus = 0;
                    let jumlahTidakLulus = 0;

                    // Perulangan manual tanpa fungsi bawaan/helper untuk menghitung statistik
                    for (let i = 0; i < daftarNilai.length; i++) {
                        const currentNilai = daftarNilai[i];
                        totalNilai += currentNilai;

                        if (currentNilai > nilaiTertinggi) {
                            nilaiTertinggi = currentNilai;
                        }

                        if (currentNilai < nilaiTerendah) {
                            nilaiTerendah = currentNilai;
                        }

                        if (currentNilai >= BATAS_LULUS) {
                            jumlahLulus++;
                        } else {
                            jumlahTidakLulus++;
                        }
                    }

                    const rataRata = (totalNilai / daftarNilai.length).toFixed(2);

                    console.log('\n--- STATISTIK KELAS ---');
                    console.log(`Total Siswa          : ${daftarNama.length}`);
                    console.log(`Rata-rata Nilai     : ${rataRata}`);
                    console.log(`Nilai Tertinggi     : ${nilaiTertinggi}`);
                    console.log(`Nilai Terendah      : ${nilaiTerendah}`);
                    console.log(`Jumlah Siswa Lulus   : ${jumlahLulus}`);
                    console.log(`Jumlah Tidak Lulus   : ${jumlahTidakLulus}`);
                }
                break;
            }

            case '3': {
                // Cek jika data siswa masih kosong
                if (daftarNama.length === 0) {
                    console.log(' Belum ada data siswa. Silakan input data terlebih dahulu (Menu 1).');
                } else {
                    console.log('\n--- PREDIKAT SISWA ---');
                    for (let i = 0; i < daftarNama.length; i++) {
                        const nama = daftarNama[i];
                        const nilai = daftarNilai[i];
                        let grade = '';
                        let status = '';

                        // Penentuan Grade (A, B, C, D)
                        if (nilai >= BATAS_GRADE_A) {
                            grade = 'A';
                        } else if (nilai >= BATAS_GRADE_B) {
                            grade = 'B';
                        } else if (nilai >= BATAS_GRADE_C) {
                            grade = 'C';
                        } else {
                            grade = 'D';
                        }

                        // Penentuan Status Kelulusan
                        if (nilai >= BATAS_LULUS) {
                            status = 'Lulus';
                        } else {
                            status = 'Tidak Lulus';
                        }

                        console.log(`${i + 1}. ${nama} | Nilai: ${nilai} | Grade: ${grade} | Status: ${status}`);
                    }
                }
                break;
            }

            case '4':
                jalan = false;
                console.log('Terima kasih.');
                break;

            default:
                console.log(' Error: Pilihan menu tidak valid. Pilih angka 1-4.');
        }
    }

    rl.close();
}

main();