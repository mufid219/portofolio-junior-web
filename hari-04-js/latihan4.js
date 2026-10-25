const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

async function main() {
    const rl = readline.createInterface({ input, output });

    const angka1 = Number(await rl.question('Angka pertama: '));
    const operator = (await rl.question('Operator (+, -, *, /): ')).trim();
    const angka2 = Number(await rl.question('Angka kedua: '));

    rl.close();

    // Validasi input angka
    if (Number.isNaN(angka1) || Number.isNaN(angka2)) {
        console.log('Error: input angka tidak valid');
        return;
    }

    let hasil;

    switch (operator) {
        case '+':
            hasil = angka1 + angka2;
            break;
        case '-':
            hasil = angka1 - angka2;
            break;
        case '*':
            hasil = angka1 * angka2;
            break;
        case '/':
            if (angka2 === 0) {
                console.log('Error: pembagian dengan nol tidak terdefinisi');
                hasil = null;
            } else {
                hasil = angka1 / angka2;
            }
            break;
        default:
            console.log('Operator tidak dikenal');
            hasil = null;
    }

    if (hasil !== null) {
        console.log(`${angka1} ${operator} ${angka2} = ${hasil}`);
    }
}

main();