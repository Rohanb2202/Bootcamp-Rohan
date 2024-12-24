const debug = require('debug');

// Create a namespace for Module A
const logger = debug('moduleA');
const errorLogger = debug('moduleA:error');

function calculateSum(a, b) {
    a = Number(a);
    b = Number(b);

    logger(`Calculating sum of ${a} and ${b}`);
    
    if (isNaN(a) || isNaN(b)) {
        errorLogger('Invalid input types');
        return NaN;
    }

    const result = a + b;
    logger(`Sum result: ${result}`);
    return result;
}

module.exports = { calculateSum };
