const logger = require('./winston_logger');

// Function to perform division
function divide(a, b) {
  try {
    if (b === 0) {
      // Log a fatal error for division by zero
      throw new Error('Division by zero is not allowed');
    }
    
    const result = a / b;
    logger.info(`Divided ${a} by ${b}, result: ${result}`);
    return result;
  } catch (error) {
    // Log the error with different severity levels
    logger.error(`Division error: ${error.message}`);
    return null;
  }
}

// Main application flow
function main() {
  // Log program start
  logger.info('Program started');

  // Demonstrate successful operation
  logger.info('Performing calculations');
  
  // Successful division
  divide(10, 2);
  
  // Attempt division by zero (will log an error)
  divide(10, 0);
  
  // Log program completion
  logger.warn('Calculations complete');
}

// Run the main function
main();