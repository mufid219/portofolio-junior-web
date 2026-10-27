import { BinarySearchTree } from "./structures.js";

const folder = {
    nama: 'proyek',
    anak: [
        { nama: 'css', anak: [] },
        { nama: 'js', anak: [{ nama: 'app.js', anak: [] }] }
    ]
};
function cetakPohon(node, tingkat = 0) {
    console.log(' '.repeat(tingkat * 2) + node.nama);
    for (const anak of node.anak) {
        cetakPohon(anak, tingkat + 1);
    }
}
function hitungNode(node) {
    let total = 1;
    for (const anak of node.anak) total += hitungNode(anak);
    return total;
}

// 2. Uji LinkedList: addFirst, addLast, removeFirst, find, toArray, serta kasus kosong dan satu elemen.
function cariNode(node, nama) {
    if (node.nama === nama) {
        return [node.nama]
    }
    for (const anak of node.anak) {
        const jalur = cariNode(anak, nama)
        if (jalur) {
            return [node.nama].concat(jalur)
        }
    }
    return undefined
}

cetakPohon(folder)
console.log("Total node: ", hitungNode(folder))
console.log("Jalur ke app.js: ", cariNode(folder, "app.js"))

// 2. Masukkan data [50, 30, 70, 20, 40, 60, 80] ke BinarySearchTree; cetak inOrder() dan uji has(60) dan has(65). Gambar pohon hasilnya.
const bst = new BinarySearchTree()
const data = [50, 30, 70, 20, 40, 60, 80]
data.forEach(num => bst.insert(num))
console.log("In-order traversal: ", bst.inOrder)
console.log("Has 60: ", bst.has(60))
console.log("Has 65: ", bst.has(65))

/*
          50
        /    \
      30      70
     /  \    /  \
    20  40  60  80
*/

/*
// Adjacency list: tiap simpul menyimpan daftar tetangganya
const graf = {
    A: ['B', 'C'],
    B: ['A', 'D'],
    C: ['A', 'D'],
    D: ['B', 'C', 'E'],
    E: ['D']
};
// BFS (melebar) memakai Queue: menemukan jarak terpendek dalam jumlah sisi
function bfs(graf, mulai) {
    const dikunjungi = new Set([mulai]);
    const antrean = [mulai];
    const urutan = [];
    while (antrean.length > 0) {
        const simpul = antrean.shift();
        urutan.push(simpul);
        for (const tetangga of graf[simpul]) {
            if (!dikunjungi.has(tetangga)) {
                dikunjungi.add(tetangga);
                antrean.push(tetangga);
            }
        }
    }
    return urutan;
}
// DFS (mendalam) memakai rekursi (Stack pemanggilan)
function dfs(graf, simpul, dikunjungi = new Set()) {
    dikunjungi.add(simpul);
    for (const tetangga of graf[simpul]) {
        if (!dikunjungi.has(tetangga)) dfs(graf, tetangga, dikunjungi);
    }
    return [...dikunjungi];
}
console.log(bfs(graf, 'A')); // ['A', 'B', 'C', 'D', 'E']
console.log(dfs(graf, 'A')); // ['A', 'B', 'D', 'C', 'E']
*/

// 3. Buat graf jaringan 6 kota (adjacency list). Jalankan bfs dan dfs, lalu buat fungsi jarakTerpendek(graf, asal, tujuan) dengan BFS yang mengembalikan jumlah sisi.
// 1. Adjacency list jaringan 6 kota di Indonesia
const grafKota = {
    Jakarta: ['Bandung', 'Semarang'],
    Bandung: ['Jakarta', 'Yogyakarta'],
    Semarang: ['Jakarta', 'Yogyakarta', 'Surabaya'],
    Yogyakarta: ['Bandung', 'Semarang', 'Surakarta'],
    Surakarta: ['Yogyakarta', 'Surabaya'],
    Surabaya: ['Semarang', 'Surakarta']
};

// 2. Fungsi BFS (Breadth-First Search)
function bfs(graf, mulai) {
    const dikunjungi = new Set([mulai]);
    const antrean = [mulai];
    const urutan = [];
    while (antrean.length > 0) {
        const simpul = antrean.shift();
        urutan.push(simpul);
        for (const tetangga of graf[simpul]) {
            if (!dikunjungi.has(tetangga)) {
                dikunjungi.add(tetangga);
                antrean.push(tetangga);
            }
        }
    }
    return urutan;
}

// 3. Fungsi DFS (Depth-First Search)
function dfs(graf, simpul, dikunjungi = new Set()) {
    dikunjungi.add(simpul);
    for (const tetangga of graf[simpul]) {
        if (!dikunjungi.has(tetangga)) {
            dfs(graf, tetangga, dikunjungi);
        }
    }
    return [...dikunjungi];
}

// 4. Fungsi Jarak Terpendek menggunakan BFS (Menghitung jumlah sisi/langkah)
function jarakTerpendek(graf, asal, tujuan) {
    if (asal === tujuan) return 0;

    const dikunjungi = new Set([asal]);
    const antrean = [[asal, 0]]; // Menyimpan [simpul, jarak_dari_asal]

    while (antrean.length > 0) {
        const [simpul, jarak] = antrean.shift();

        for (const tetangga of graf[simpul]) {
            if (tetangga === tujuan) {
                return jarak + 1; // Ketemu tujuan, kembalikan jarak + 1 sisi
            }
            if (!dikunjungi.has(tetangga)) {
                dikunjungi.add(tetangga);
                antrean.push([tetangga, jarak + 1]);
            }
        }
    }
    return -1; // Jika kota tidak terhubung
}

/*
Jakarta -------- Semarang -------- Surabaya
     |                |                 |
     |                |                 |
Bandung ------ Yogyakarta ------- Surakarta
*/

// --- PENGUJIAN ---
console.log("=== TRAVERSAL GRAF KOTA ===");
console.log("BFS dari Jakarta:", bfs(grafKota, 'Jakarta'));
// Contoh Output: [ 'Jakarta', 'Bandung', 'Semarang', 'Yogyakarta', 'Surabaya', 'Surakarta' ]

console.log("DFS dari Jakarta:", dfs(grafKota, 'Jakarta'));
// Contoh Output: [ 'Jakarta', 'Bandung', 'Yogyakarta', 'Semarang', 'Surakarta', 'Surabaya' ]

console.log("\n=== UJI JARAK TERPENDEK ===");
console.log("Jarak Jakarta ke Surakarta:", jarakTerpendek(grafKota, 'Jakarta', 'Surakarta'), "langkah (sisi)");
// Output: 3 langkah (Jakarta -> Semarang -> Yogyakarta -> Surakarta)

console.log("Jarak Jakarta ke Surabaya:", jarakTerpendek(grafKota, 'Jakarta', 'Surabaya'), "langkah (sisi)");
// Output: 2 langkah (Jakarta -> Semarang -> Surabaya)
