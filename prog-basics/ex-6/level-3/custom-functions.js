// custom-functions.js
module.exports = {
    greet: (name) => {
      console.log(`Hello, ${name}! Welcome to the Dynamic Function Loader.`);
      return `Greeting: Hello, ${name}!`;
    },
    
    sayGoodbye: (name) => {
      console.log(`Goodbye, ${name}! Hope to see you again.`);
      return `Farewell: Goodbye, ${name}!`;
    }
  };