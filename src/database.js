require('dotenv').config();
const { Pool } = require('pg');

const  pool = new Pool ({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}).promise;

// (
//     async() => {
//         try {
//             await pool.connect();
//             const res = await pool.query('SELECT NOW()');
//             console.log(res.rows[0]);
//         } catch (err) {
//             console.error('Error occured during the connection to the DB', err);
//         } finally {
//             await pool.end();
//         }
//     }
// )();

module.exports = { pool };