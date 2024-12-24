require('dotenv').config(); // Load environment variables
const sqlite3 = require('sqlite3').verbose();
const winston = require('winston');

// Configure winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' })
    ]
});

// Load environment variables
const DB_FILE = process.env.DB_FILE || './default.sqlite';
const API_KEY = process.env.API_KEY || 'defaultapikey';

// Securely log configuration
logger.info(`Using database file: ${DB_FILE}`);
if (process.env.API_KEY) {
    logger.info('API key loaded securely.');
} else {
    logger.warn('API key is missing! Using fallback.');
}

// Connect to SQLite database
const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        logger.error(`Failed to connect to database: ${err.message}`);
        return;
    }
    logger.info('Connected to SQLite database.');
});

// Example query to create a table
db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )`,
        (err) => {
            if (err) {
                logger.error(`Failed to create table: ${err.message}`);
            } else {
                logger.info('Users table is ready.');
            }
        }
    );
});

// Example API usage
function callApi(endpoint) {
    logger.info(`Calling API at endpoint: ${endpoint}`);
    // Mask API key in logs
    logger.debug(`Using API key: ${API_KEY.replace(/./g, '*')}`);
    // Simulate API call
    console.log(`Fetching data from ${endpoint} with API key: ${API_KEY}`);
}

// Call the example API
callApi('https://example.com/data');

// Close the database connection
db.close((err) => {
    if (err) {
        logger.error(`Failed to close the database: ${err.message}`);
    } else {
        logger.info('Database connection closed.');
    }
});
