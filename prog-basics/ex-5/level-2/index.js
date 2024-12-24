require('dotenv').config(); // Load environment variables

const winston = require('winston');

// Configure winston logger for warnings and info
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'app.log' }) // Log to file
    ]
});

// Fallback values for environment variables
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'password';

// Log warnings for missing variables
if (!process.env.PORT) logger.warn('PORT is missing in .env. Using fallback value: 3000');
if (!process.env.DB_HOST) logger.warn('DB_HOST is missing in .env. Using fallback value: localhost');
if (!process.env.DB_USER) logger.warn('DB_USER is missing in .env. Using fallback value: root');
if (!process.env.DB_PASS) logger.warn('DB_PASS is missing in .env. Using fallback value: password');

// Simulate program configuration
console.log(`Server is running on port ${PORT}`);
console.log(`Connecting to database at ${DB_HOST} as ${DB_USER}...`);
