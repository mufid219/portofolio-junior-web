-- DML
INSERT INTO
    kelas (nama_kelas, kuota)
VALUES
    ('Web Programming', 30),
    ('Desain
Grafis', 25);

INSERT INTO
    pendaftar (nama, email, no_hp, alamat, kelas_id)
VALUES
    (
        'Sari',
        'sari@contoh.com',
        '081234567890',
        'Surakarta',
        1
    );

SELECT
    id,
    nama,
    email
FROM
    pendaftar
WHERE
    kelas_id = 1
ORDER BY
    nama ASC
LIMIT
    10 OFFSET 0;

SELECT
    p.nama,
    k.nama_kelas
FROM
    pendaftar p
    JOIN kelas k ON k.id = p.kelas_id
WHERE
    p.nama LIKE '%sar%';

SELECT
    k.nama_kelas,
    COUNT(p.id) AS jumlah
FROM
    kelas k
    LEFT JOIN pendaftar p ON p.kelas_id = k.id
GROUP BY
    k.id,
    k.nama_kelas;

UPDATE
    pendaftar
SET
    no_hp = '081111111111'
WHERE
    id = 1;

DELETE FROM
    pendaftar
WHERE
    id = 1;

-- 3. Isi 2-3 kelas dan sedikitnya 8 pendaftar (sertakan nama yang mengandung kata sama).
INSERT INTO
    kelas (nama_kelas, kuota)
VALUES
    ('Game Programming', 20),
    ('UI/UX', 28),
    ('Video Editing', 34);

INSERT INTO
    pendaftar (nama, email, no_hp, alamat, kelas_id)
VALUES
    (
        'Agus Prasetyo',
        'agus@contoh.com',
        '081234567898',
        'Salatiga',
        4
    ),
    (
        'Nina Kartika',
        'nina@contoh.com',
        '081234567899',
        'Klaten',
        5
    ),
    (
        'Bayu Saputra',
        'bayu@contoh.com',
        '081234567900',
        'Solo',
        1
    ),
    (
        'Citra Dewi',
        'citra@contoh.com',
        '081234567901',
        'Magelang',
        2
    ),
    (
        'Dimas Prakoso',
        'dimas@contoh.com',
        '081234567902',
        'Purwokerto',
        3
    ),
    (
        'Eka Rahmawati',
        'eka@contoh.com',
        '081234567903',
        'Tegal',
        4
    ),
    (
        'Galih Pratama',
        'galih@contoh.com',
        '081234567904',
        'Pekalongan',
        5
    ),
    (
        'Hesti Wulandari',
        'hesti@contoh.com',
        '081234567905',
        'Kudus',
        1
    );

-- 1. Tampilkan semua pendaftar diurutkan nama A-Z
SELECT
    *
FROM
    pendaftar
ORDER BY
    nama ASC;

-- 2. Tampilkan 5 Pendaftar Terbaru
SELECT
    *
FROM
    pendaftar
ORDER BY
    tgl_daftar DESC
LIMIT
    5;

-- 3. Cari Pendaftar yang Namanya Mengandung "an"
SELECT
    *
FROM
    pendaftar
WHERE
    nama LIKE '%an%';

-- 4. Tampilkan Nama Pendaftar Beserta Nama Kelas (JOIN)
SELECT
    p.id,
    p.nama AS nama_pendaftar,
    p.email,
    p.no_hp,
    k.nama_kelas
FROM
    pendaftar p
    INNER JOIN kelas k ON p.kelas_id = k.id;

-- 5. Hitung Jumlah Pendaftar per Kelas (GROUP BY)
SELECT
    k.nama_kelas,
    COUNT(p.id) AS total_pendaftar
FROM
    kelas k
    LEFT JOIN pendaftar p ON k.id = p.kelas_id
GROUP BY
    k.id,
    k.nama_kelas;

-- 6. Tampilkan Kelas yang Belum Memiliki Pendaftar
SELECT
    k.id,
    k.nama_kelas
FROM
    kelas k
    LEFT JOIN pendaftar p ON k.id = p.kelas_id
WHERE
    p.id IS NULL;

-- 7. Ubah Nomor HP Satu Pendaftar
UPDATE
    pendaftar
SET
    no_hp = '081234567890'
WHERE
    id = 1;

-- 8. Hapus Satu Pendaftar
DELETE FROM
    pendaftar
WHERE
    id = 2;

-- 9. Simulasi Error Email Ganda (1062 Duplicate entry)
-- Jalankan insert pertama (berhasil):
INSERT INTO
    pendaftar (nama, email, no_hp, kelas_id)
VALUES
    (
        'Budi Santoso',
        'budi@example.com',
        '0811111111',
        1
    );

-- Jalankan insert kedua dengan email yang sama (error):
INSERT INTO
    pendaftar (nama, email, no_hp, kelas_id)
VALUES
    (
        'Budi Gunawan',
        'budi@example.com',
        '0822222222',
        1
    );

-- 10. Simulasi Error Hapus Kelas yang Memiliki Pendaftar (1451 Foreign Key Constraint)
-- Hapus kelas yang ID-nya masih digunakan oleh pendaftar:
DELETE FROM
    kelas
WHERE
    id = 1;