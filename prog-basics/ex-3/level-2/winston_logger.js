const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)){
    fs.mkdirSync(logsDir);
}

// Custom log format with detailed timestamp and structured output
const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    winston.format.printf(({ timestamp, level, message, ...metadata }) => {
        let msg = `${timestamp} [${level.toUpperCase()}]: ${message} `;
        
        // Include any additional metadata if present
        if (Object.keys(metadata).length > 0) {
            msg += JSON.stringify(metadata);
        }
        
        return msg;
    })
);

// Create the logger
const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        // Console transport for real-time logging
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                logFormat
            )
        }),
        
        // File transport for all logs
        new winston.transports.File({
            filename: path.join(logsDir, 'application.log'),
            level: 'info',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        
        // Separate file for errors
        new winston.transports.File({
            filename: path.join(logsDir, 'error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        })
    ]
});

module.exports = logger;