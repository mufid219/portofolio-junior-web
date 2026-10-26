// 1. Buat structures.js dan salin kelas Stack (T5) dengan export class Stack.
export class Stack {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.isEmpty() ? undefined : this.items.pop();
    }
    peek() {
        return this.isEmpty() ? undefined : this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
    clear() {
        this.items = [];
    }
    trimToMax(maxSize) {
        const kelebihan = this.items.length - maxSize;
        if (kelebihan > 0) {
            this.items.splice(0, kelebihan); // buang dari bawah
        }
    }
}

export class Queue {
    constructor() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(item) {
        this.items[this.tail] = item;
        this.tail++;
    }
    dequeue() {
        if (this.isEmpty()) return undefined;
        const item = this.items[this.head];
        delete this.items[this.head];
        this.head++;
        return item;
    }
    front() {
        return this.items[this.head];
    }

    isEmpty() {
        return this.tail === this.head;
    }
    size() {
        return this.tail - this.head;
    }
    toArray() {
        const hasil = [];
        for (let i = this.head; i < this.tail; i++) {
            hasil.push(this.items[i]);
        }
        return hasil;
    }
}



