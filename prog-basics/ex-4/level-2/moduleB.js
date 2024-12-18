const debug = require('debug');

// Create a namespace for Module B
const logger = debug('moduleB');
const errorLogger = debug('moduleB:error');

function calculateProduct(a, b) {
    a = Number(a);
    b = Number(b);

    logger(`Calculating product of ${a} and ${b}`);
    
    if (isNaN(a) || isNaN(b)) {
        errorLogger('Invalid input types');
        return NaN;
    }

    const result = a * b;
    logger(`Product result: ${result}`);
    return result;
}

module.exports = { calculateProduct };
