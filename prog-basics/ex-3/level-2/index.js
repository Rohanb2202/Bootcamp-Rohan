const logger = require('./winston_logger');

// Function to perform division with enhanced logging
function divide(a, b) {
    logger.info(`Attempting to divide ${a} by ${b}`, { 
        operation: 'division', 
        numerator: a, 
        denominator: b 
    });

    try {
        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        
        const result = a / b;
        logger.info(`Division successful`, { 
            result: result,
            operation: 'division'
        });
        return result;
    } catch (error) {
        logger.error(`Division failed`, { 
            error: error.message,
            numerator: a,
            denominator: b
        });
        return null;
    }
}

// Main application flow
function main() {
    logger.info('Program started', { event: 'startup' });

    logger.info('Performing calculations', { stage: 'calculation' });
    
    // Successful division
    divide(10, 2);
    
    // Attempt division by zero
    divide(10, 0);
    
    logger.warn('Calculations complete', { event: 'completion' });
}

// Run the main function
main();