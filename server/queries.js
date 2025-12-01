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

// Read all sites

// Get all sites
const getSites = (request, response) => {
    pool.query('SELECT * FROM sites ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

// Update a site

// Delete a site

module.exports = {
    getSites,
};