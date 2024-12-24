const debug = require('debug');

// Import modules
const moduleA = require('./moduleA');
const moduleB = require('./moduleB');

function main() {
    const resultA = moduleA.calculateSum(5, 7);
    console.log(`Result from Module A: ${resultA}`);

    const resultB = moduleB.calculateProduct(3, 4);
    console.log(`Result from Module B: ${resultB}`);
}

main();
