import { Queue } from "./structures.js";

// 2. Uji dengan enqueue tiga elemen, dequeue hingga kosong, dan dequeue pada queue kosong.
const queue = new Queue();

queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())

console.log(queue.dequeue())
