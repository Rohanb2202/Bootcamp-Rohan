// Function to validate if a value is a valid number
function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

// Main function to calculate sum of command-line arguments
function calculateSum() {
    // Slice first two arguments (node executable path and script path)
    const args = process.argv.slice(2);

    // Check if any arguments were provided
    if (args.length === 0) {
        console.error('Error: Please provide numeric arguments to sum.');
        process.exit(1);
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

    // Calculate and display the sum
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    console.log(`Sum: ${sum}`);
}

// Run the sum calculation
calculateSum();