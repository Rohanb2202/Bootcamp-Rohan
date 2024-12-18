const debug = require('debug');
const winston = require('winston');
const readline = require('readline');

// Create a debug namespace
const logger = debug('app');
const errorLogger = debug('app:error');

// Configure winston logger
const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(), // Logs to the console
        new winston.transports.File({ filename: 'app.log' }) // Logs to a file
    ]
});

// Interactive Readline Interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Program logic
function calculateSum(a, b) {
    logger(`Calculating sum of ${a} and ${b}`);
    winstonLogger.info(`Calculating sum: a=${a}, b=${b}`);
    
    if (isNaN(a) || isNaN(b)) {
        errorLogger('Invalid input for sum calculation');
        winstonLogger.error(`Invalid inputs for sum: a=${a}, b=${b}`);
        return NaN;
    }
    
    const result = a + b;
    logger(`Sum result: ${result}`);
    winstonLogger.info(`Sum result: ${result}`);
    return result;
}

function calculateProduct(a, b) {
    logger(`Calculating product of ${a} and ${b}`);
    winstonLogger.info(`Calculating product: a=${a}, b=${b}`);
    
    if (isNaN(a) || isNaN(b)) {
        errorLogger('Invalid input for product calculation');
        winstonLogger.error(`Invalid inputs for product: a=${a}, b=${b}`);
        return NaN;
    }
    
    const result = a * b;
    logger(`Product result: ${result}`);
    winstonLogger.info(`Product result: ${result}`);
    return result;
}

// Interactive prompt
function interactivePrompt() {
    rl.question('Enter first number: ', (inputA) => {
        rl.question('Enter second number: ', (inputB) => {
            const a = Number(inputA);
            const b = Number(inputB);

            rl.question('Choose operation (sum/product): ', (operation) => {
                let result;
                if (operation === 'sum') {
                    result = calculateSum(a, b);
                } else if (operation === 'product') {
                    result = calculateProduct(a, b);
                } else {
                    console.log('Invalid operation');
                    winstonLogger.warn('User entered an invalid operation');
                }

                if (result !== undefined) {
                    console.log(`Result: ${result}`);
                }

                rl.question('Do you want to perform another calculation? (yes/no): ', (answer) => {
                    if (answer.toLowerCase() === 'yes') {
                        interactivePrompt();
                    } else {
                        console.log('Goodbye!');
                        rl.close();
                    }
                });
            });
        });
    });
}

// Start the program
interactivePrompt();

//To Debug
// $env:DEBUG="app"; node index.js