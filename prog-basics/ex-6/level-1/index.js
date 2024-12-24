const config = require('config');

function main() {
  // Read configuration values
  const dbConfig = config.get('database');
  const appConfig = config.get('application');
  const loggingConfig = config.get('logging');

  // Display configuration values
  console.log('Database Configuration:');
  console.log(`Host: ${dbConfig.host}`);
  console.log(`Port: ${dbConfig.port}`);
  console.log(`Username: ${dbConfig.username}`);

  console.log('\nApplication Configuration:');
  console.log(`Name: ${appConfig.name}`);
  console.log(`Version: ${appConfig.version}`);
  console.log(`Environment: ${appConfig.environment}`);

  console.log('\nLogging Configuration:');
  console.log(`Level: ${loggingConfig.level}`);
  console.log(`Log File: ${loggingConfig.file}`);
}

// Run the main function
main();