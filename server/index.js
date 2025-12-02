const express = require('express');
const path = require('path');
const dbQueries = require('./queries');
const app = express();

const PORT = 9001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Host react app as static files
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// Routes
app.get('/', (req, res) => {
    // Will add some logic here later
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

// CRUD routes
// --- Create a new site ---
app.post('/sites', dbQueries.createSite);
// --- Read all sites ---
app.get('/sites', dbQueries.getSites);
// --- Update a site ---
app.put('/sites/:id', dbQueries.updateSite);
// --- Delete a site ---
app.delete('/sites/:id', dbQueries.deleteSite);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});