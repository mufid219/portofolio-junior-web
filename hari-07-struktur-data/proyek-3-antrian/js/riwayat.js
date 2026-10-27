import { Stack } from './structures.js';

export function inisialisasiRiwayat(elemenDom) {
    const { editor, tombolUndo, tombolRedo, info } = elemenDom;

    const MAKS_RIWAYAT = 50;
    const JEDA_DEBOUNCE = 500;

    const undoStack = new Stack();
    const redoStack = new Stack();

    let teksSekarang = '';
    let snapshotAwalSesi = null;
    let debounceTimer = null;

    function perbaruiTombol() {
        tombolUndo.disabled = undoStack.isEmpty();
        tombolRedo.disabled = redoStack.isEmpty();
        info.textContent = `Riwayat: ${undoStack.size()} undo, ${redoStack.size()} redo (maks ${MAKS_RIWAYAT})`;
    }

    function commitSesi() {
        clearTimeout(debounceTimer);
        debounceTimer = null;

        if (snapshotAwalSesi === null) return;
        if (snapshotAwalSesi === editor.value) {
            snapshotAwalSesi = null;
            return;
        }

        undoStack.push(snapshotAwalSesi);
        undoStack.trimToMax(MAKS_RIWAYAT);
        teksSekarang = editor.value;
        redoStack.clear();
        snapshotAwalSesi = null;
    }

    editor.addEventListener('input', () => {
        if (snapshotAwalSesi === null) {
            snapshotAwalSesi = teksSekarang;
        }

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            commitSesi();
            perbaruiTombol();
        }, JEDA_DEBOUNCE);
    });

    tombolUndo.addEventListener('click', () => {
        commitSesi();
        if (undoStack.isEmpty()) { perbaruiTombol(); return; }

        redoStack.push(teksSekarang);
        teksSekarang = undoStack.pop();
        editor.value = teksSekarang;
        perbaruiTombol();
    });

    tombolRedo.addEventListener('click', () => {
        commitSesi();
        if (redoStack.isEmpty()) { perbaruiTombol(); return; }

        undoStack.push(teksSekarang);
        undoStack.trimToMax(MAKS_RIWAYAT);
        teksSekarang = redoStack.pop();
        editor.value = teksSekarang;
        perbaruiTombol();
    });

    perbaruiTombol();
}