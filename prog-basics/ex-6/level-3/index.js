const config = require('config');
const fs = require('fs');
const path = require('path');

class DynamicFunctionLoader {
  constructor() {
    this.loadedFunctions = {};
    this.config = config.get('application');
    this.functionsConfig = config.get('functions');
    this.setupLogging();
    this.loadDynamicFunctions();
  }

  setupLogging() {
    // Configure logging based on configuration
    this.logLevel = this.config.logging.level;
    console.log(`Logging set to: ${this.logLevel}`);
  }

  log(level, message) {
    const logLevels = ['error', 'warn', 'info', 'debug'];
    if (logLevels.indexOf(level) <= logLevels.indexOf(this.logLevel)) {
      console.log(`[${level.toUpperCase()}] ${message}`);
    }
  }

  loadDynamicFunctions() {
    // Dynamically load functions from configured modules
    Object.entries(this.functionsConfig).forEach(([category, moduleConfig]) => {
      try {
        // Resolve the module path relative to the current script
        const modulePath = path.resolve(__dirname, moduleConfig.module);
        
        // Load the module
        const module = require(modulePath);
        
        // Store loaded functions
        this.loadedFunctions[category] = {};
        
        // Add configured commands from this module
        moduleConfig.commands.forEach(cmd => {
          if (module[cmd.name]) {
            this.loadedFunctions[category][cmd.name] = module[cmd.name];
            this.log('info', `Loaded function: ${category}.${cmd.name}`);
          } else {
            this.log('warn', `Function ${cmd.name} not found in module ${moduleConfig.module}`);
          }
        });
      } catch (error) {
        this.log('error', `Error loading module ${moduleConfig.module}: ${error.message}`);
      }
    });
  }

  executeFunction(category, functionName, ...args) {
    try {
      if (!this.loadedFunctions[category] || !this.loadedFunctions[category][functionName]) {
        throw new Error(`Function ${category}.${functionName} not found`);
      }
      
      this.log('debug', `Executing ${category}.${functionName} with args: ${args}`);
      
      const result = this.loadedFunctions[category][functionName](...args);
      
      this.log('info', `${category}.${functionName} executed successfully`);
      return result;
    } catch (error) {
      this.log('error', `Error executing ${category}.${functionName}: ${error.message}`);
      throw error;
    }
  }

  listAvailableFunctions() {
    console.log('Available Functions:');
    Object.entries(this.loadedFunctions).forEach(([category, functions]) => {
      console.log(`- ${category}:`);
      Object.keys(functions).forEach(func => {
        console.log(`  * ${func}`);
      });
    });
  }
}

// Main execution
function main() {
  const loader = new DynamicFunctionLoader();

  // List available functions
  loader.listAvailableFunctions();

  // Demonstrate function execution
  console.log('\n--- Function Demonstrations ---');
  
  // Math functions
  console.log('Sin of π/2:', loader.executeFunction('math', 'sin', Math.PI / 2));
  console.log('Cos of 0:', loader.executeFunction('math', 'cos', 0));
  console.log('Square of 5:', loader.executeFunction('math', 'square', 5));

  // Custom functions
  console.log('Greeting:', loader.executeFunction('custom', 'greet', 'Alice'));
  console.log('Goodbye:', loader.executeFunction('custom', 'sayGoodbye', 'Bob'));
}

// Run the main function
main();