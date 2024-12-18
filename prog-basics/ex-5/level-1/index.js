// Load environment variables
require('dotenv').config();

const debug = require('debug')('app');

// Access environment variables
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

// Simulate program configuration
debug('Configuration Loaded:');
debug(`PORT: ${PORT}`);
debug(`DB_HOST: ${DB_HOST}`);
debug(`DB_USER: ${DB_USER}`);
debug(`DB_PASS: ${DB_PASS}`);

// Simulate server start
console.log(`Server is running on port ${PORT}`);
console.log(`Connecting to database at ${DB_HOST} as ${DB_USER}...`);


