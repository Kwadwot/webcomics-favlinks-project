const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

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
    const { site_name, site_link, comic_type, popular_comic_name, popular_comic_link } = request.body;

    pool.query(`INSERT INTO sites (site_name, site_link, comic_type, popular_comic_name, popular_comic_link) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [site_name, site_link, comic_type, popular_comic_name, popular_comic_link], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return response.status(500).json({ error: 'Failed to create site' });
        }
        response.status(201).json(results.rows[0]);  // Fixed: use results.rows[0] instead of insertId
    });
};

// Read all sites
const getSites = (request, response) => {
    pool.query('SELECT * FROM sites ORDER BY id ASC', (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return response.status(500).json({ error: 'Failed to fetch sites' });
        }
        response.status(200).json(results.rows);
    });
};

// Update a site
const updateSite = (request, response) => {
    const { id } = request.params;
    const { site_name, site_link, comic_type, popular_comic_name, popular_comic_link } = request.body;
    pool.query(`UPDATE sites 
        SET site_name = $1,
            site_link = $2,
            comic_type = $3,
            popular_comic_name = $4,
            popular_comic_link = $5
        WHERE id = $6
        RETURNING *`,
        [site_name, site_link, comic_type, popular_comic_name, popular_comic_link, id],
        (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return response.status(500).json({ error: 'Failed to update site' });
        }
        if (results.rows.length === 0) {
            return response.status(404).json({ error: 'Site not found' });
        }
        response.status(200).send(results.rows[0]);
    });
};


// Delete a site
const deleteSite = (request, response) => {
    const { id } = request.params;
    pool.query('DELETE FROM sites WHERE id = $1 RETURNING *', [id], (error) => {
        if (error) {
            console.error('Database error:', error);
            return response.status(500).json({ error: 'Failed to delete site' });
        }
        if (results.rows.length === 0) {
            return response.status(404).json({ error: 'Site not found' });
        }
        response.status(200).send({ message: 'Site deleted', id: results.rows[0].id });
    });
};

module.exports = {
    getSites,
    createSite,
    updateSite,
    deleteSite,
};