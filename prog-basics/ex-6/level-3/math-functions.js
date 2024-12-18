// math-functions.js
module.exports = {
    sin: (x) => {
      console.log(`Calculating sine of ${x}`);
      return Math.sin(x);
    },
    
    cos: (x) => {
      console.log(`Calculating cosine of ${x}`);
      return Math.cos(x);
    },
    
    square: (x) => {
      console.log(`Calculating square of ${x}`);
      return x * x;
    }
  };