#!/usr/bin/env node

// Function to validate if a value is a valid number
function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

// Function to display usage instructions
function displayUsage() {
    console.log(`
Usage: node index.js [--multiply] <numbers>

Options:
  --multiply    Multiply the input numbers instead of adding them
  
Examples:
  node index.js 1 2 3 4       # Adds numbers (default)
  node index.js --multiply 1 2 3 4   # Multiplies numbers
`);
    process.exit(0);
}

// Main function to calculate sum or product of command-line arguments
function calculate() {
    // Check for help flag
    if (process.argv.includes('--help') || process.argv.includes('-h')) {
        displayUsage();
    }

    // Determine if multiply flag is present
    const multiplyMode = process.argv.includes('--multiply');
    
    // Filter out the flag from arguments
    const args = process.argv.slice(2).filter(arg => arg !== '--multiply');

    // Check if any arguments were provided
    if (args.length === 0) {
        console.error('Error: Please provide numeric arguments to calculate.');
        displayUsage();
    }

    // Validate and convert arguments to numbers
    const numbers = [];
    for (const arg of args) {
        if (!isValidNumber(arg)) {
            console.error(`Error: Invalid input. '${arg}' is not a valid number.`);
            process.exit(1);
        }
        numbers.push(Number(arg));
    }

    // Calculate based on mode
    const result = multiplyMode 
        ? numbers.reduce((acc, curr) => acc * curr, 1)
        : numbers.reduce((acc, curr) => acc + curr, 0);

    // Display the result
    console.log(`${multiplyMode ? 'Product' : 'Sum'}: ${result}`);
}

// Run the calculation
calculate();