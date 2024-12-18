const chalk = require('chalk');

// Different styled console outputs
console.log(chalk.blue('Welcome to the Day 4 Exercise!'));
console.log(chalk.grey('This is Rohan!'));
console.log(chalk.green('Styling console messages with chalk.'));
console.log(chalk.red('Error messages can be highlighted too.'));
console.log(chalk.yellow('Warning: This is a yellow message.'));
console.log(chalk.magenta('Colorful debugging is fun!'));

// Combining styles
console.log(chalk.bold.green('Bold and green message'));
console.log(chalk.underline.red('Underlined red text'));