const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Temporary debugging - remove after fixing
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASSWORD type:', typeof process.env.DB_PASSWORD);
console.log('DB_PASSWORD value:', process.env.DB_PASSWORD ? '***exists***' : 'UNDEFINED');
console.log('DB_PORT:', process.env.DB_PORT);

// Connect to the database using the node-postgres package
const POOL = require('pg').Pool;

const pool = new POOL({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// console.log(pool);

// --- Create all the functions for handling the express server
//  requests and database queries ---

// Create a new site
const createSite = (request, response) => {
    const { name, URL } = request.body;
    pool.query('INSERT INTO sites (name, URL) VALUES ($1, $2)', [name, URL], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Site added with ID: ${results.insertId}`);
    });
};

// Read all sites
const getSites = (request, response) => {
    pool.query('SELECT * FROM sites ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

// Update a site
const updateSite = (request, response) => {
    const { id } = request.params;
    const { name, URL } = request.body;
    pool.query('UPDATE sites SET name = $1, URL = $2 WHERE id = $3', [name, URL, id], (error) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Site updated with ID: ${id}`);
    });
};


// Delete a site
const deleteSite = (request, response) => {
    const { id } = request.params;
    pool.query('DELETE FROM sites WHERE id = $1', [id], (error) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Site deleted with ID: ${id}`);
    });
};

module.exports = {
    getSites,
    createSite,
    updateSite,
    deleteSite,
};