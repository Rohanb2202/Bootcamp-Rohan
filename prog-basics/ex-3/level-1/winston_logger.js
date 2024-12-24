const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    // Console transport
    new winston.transports.Console(),

    // Separate log files for each level
    new winston.transports.File({ 
      filename: path.join('logs', 'info.log'), 
      level: 'info' 
    }),
    new winston.transports.File({ 
      filename: path.join('logs', 'warn.log'), 
      level: 'warn' 
    }),
    new winston.transports.File({ 
      filename: path.join('logs', 'error.log'), 
      level: 'error' 
    })
  ]
});

module.exports = logger;