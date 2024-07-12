// require('dotenv').config();
// const { Pool } = require('pg');

// const  pool = new Pool ({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//     // dialect: 'postgres',
//     // dialectModule: pg,
//     // timezone: process.env.TZ
//     max: 10, // プールの最大接続数
//     idleTimeoutMillis: 30000, // 非アクティブ接続がクローズされるまでの待機時間
//     connectionTimeoutMillis: 2000, // 新しい接続が確立されるまでのタイムアウト時間
// });

// pool.on('connect', () => {
//     console.log('Connected to the database');
// });

// pool.on('error', (err) => {
//     console.error('Unexpected error on idle client', err);
//     process.exit(-1);
// });


// console.log('Created the connection to the database');
// module.exports = { pool };

//* http://localhost:3000/

require('dotenv').config();
const { Client } = require('pg');

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
}

const client = new Client(dbConfig);

client
    .connect()
    .then(()=>{
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });

 module.exports = { client };
