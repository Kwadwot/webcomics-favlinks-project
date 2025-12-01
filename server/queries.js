// Connect to the database using the node-postgres package
const POOL = require('pg').Pool;

const pool = new POOL({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

console.log(pool);