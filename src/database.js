require('dotenv').config();
const { Pool } = require('pg');

const  pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // dialect: 'postgres',
    // dialectModule: pg,
    // timezone: process.env.TZ
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});


console.log('Created the connection to the database');
module.exports = { pool };