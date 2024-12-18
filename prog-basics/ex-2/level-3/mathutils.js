// Utility function to check if a value is a valid number
const isValidNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

// Function to add numbers
const add = (numbers) => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

// Function to multiply numbers
const multiply = (numbers) => {
    return numbers.reduce((acc, curr) => acc * curr, 1);
}

module.exports = {
    isValidNumber,
    add,
    multiply
};