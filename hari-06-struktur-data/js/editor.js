import { Stack } from "../structures.js";


const editor = document.getElementById('editor');
const tombolUndo = document.getElementById('undo');
const tombolRedo = document.getElementById('redo');
const info = document.getElementById('info');

const BATAS_RIWAYAT = 50;    // maksimal 50 snapshot
const JEDA_DEBOUNCE = 500;   // ms jeda sebelum snapshot disimpan

const undoStack = new Stack();
const redoStack = new Stack();

let teksSekarang = '';
let snapshotAwalSesi = null; // state sebelum sesi mengetik dimulai
let debounceTimer = null;

function perbaruiTombol() {

    tombolUndo.disabled = undoStack.isEmpty();
    tombolRedo.disabled = redoStack.isEmpty();
    // info.textContent = `Riwayat: ${undoStack.size()} undo, ${redoStack.size()} redo`;
    info.textContent = `Riwayat: ${undoStack.size()} undo, ${redoStack.size()} redo (maks ${BATAS_RIWAYAT})`
}

// Komit sesi mengetik yang tertunda (kalau ada)
function commitSesi() {
    clearTimeout(debounceTimer);
    debounceTimer = null;

    if (snapshotAwalSesi === null) return;          // tidak ada sesi
    if (snapshotAwalSesi === editor.value) {        // user mengetik lalu balik ke awal
        snapshotAwalSesi = null;
        return;
    }

    undoStack.push(snapshotAwalSesi);
    undoStack.trimToMax(BATAS_RIWAYAT);
    teksSekarang = editor.value;
    redoStack.clear();
    snapshotAwalSesi = null;
}

// editor.addEventListener('input', () => {
//     undoStack.push(teksSekarang);
//     teksSekarang = editor.value;
//     redoStack.clear();
//     perbaruiTombol();
// });
// ===== Debounce: satu snapshot per jeda mengetik =====
editor.addEventListener('input', () => {
    if (snapshotAwalSesi === null) {
        snapshotAwalSesi = teksSekarang;   // tangkap state SEBELUM sesi
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        commitSesi();
        perbaruiTombol();
    }, JEDA_DEBOUNCE);
});

// tombolUndo.addEventListener('click', () => {
//     if (undoStack.isEmpty()) return;
//     redoStack.push(teksSekarang);
//     teksSekarang = undoStack.pop();
//     editor.value = teksSekarang;
//     perbaruiTombol();
// });
// ===== Undo =====
tombolUndo.addEventListener('click', () => {
    commitSesi();                           // flush dulu agar edit terakhir ikut ter-undo

    if (undoStack.isEmpty()) { perbaruiTombol(); return; }

    redoStack.push(teksSekarang);
    teksSekarang = undoStack.pop();
    editor.value = teksSekarang;
    perbaruiTombol();
});

// tombolRedo.addEventListener('click', () => {
//     if (redoStack.isEmpty()) return;
//     undoStack.push(teksSekarang);
//     teksSekarang = redoStack.pop();
//     editor.value = teksSekarang;
//     perbaruiTombol();
// });
// ===== Redo =====
tombolRedo.addEventListener('click', () => {
    commitSesi();

    if (redoStack.isEmpty()) { perbaruiTombol(); return; }

    undoStack.push(teksSekarang);
    undoStack.trimToMax(BATAS_RIWAYAT);
    teksSekarang = redoStack.pop();
    editor.value = teksSekarang;
    perbaruiTombol();
});

perbaruiTombol();