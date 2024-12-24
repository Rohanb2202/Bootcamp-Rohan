const debug = require('debug');

// Create debug loggers
const logger = debug('my-module');
const errorLogger = debug('my-module:error');

function calculateSum(a, b) {
    // Ensure inputs are numbers
    a = Number(a);
    b = Number(b);

    // Log input parameters
    logger(`Calculating sum of ${a} and ${b}`);
    
    if (isNaN(a) || isNaN(b)) {
        errorLogger('Invalid input types');
        return NaN;
    }
    
    const result = a + b;
    
    // Log the result
    logger(`Sum result: ${result}`);
    
    return result;
}

function main() {
    const x = 5, y = 7;
    const total = calculateSum(x, y);
    console.log(`Total: ${total}`);
}

main();

// Debugging instructions:
//$env:DEBUG="*"; node index.js