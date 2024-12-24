const config = require('config');

function displayConfiguration() {
  // Read configuration values
  const dbConfig = config.get('database');
  const appConfig = config.get('application');
  const loggingConfig = config.get('logging');

  console.log('Current Configuration:');
  console.log('===================');
  
  console.log('\nDatabase Configuration:');
  console.log(`Host: ${dbConfig.host}`);
  console.log(`Port: ${dbConfig.port}`);
  console.log(`Username: ${dbConfig.username}`);

  console.log('\nApplication Configuration:');
  console.log(`Name: ${appConfig.name}`);
  console.log(`Version: ${appConfig.version}`);
  console.log(`Environment: ${appConfig.environment}`);
  console.log(`Debug Mode: ${appConfig.debug}`);

  console.log('\nLogging Configuration:');
  console.log(`Level: ${loggingConfig.level}`);
  console.log(`Log File: ${loggingConfig.file}`);
}

function main() {
  // Display current configuration
  displayConfiguration();

  // Demonstrate how to check current environment
  console.log('\n--- Environment Check ---');
  console.log(`Current Environment: ${config.get('application.environment')}`);
}

// Run the main function
main(); 

//To Run
//$env:NODE_ENV="development/production"; node index.js