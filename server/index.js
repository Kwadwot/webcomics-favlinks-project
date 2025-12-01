require('dotenv').config();
const express = require('express');
const dbQueries = require('./queries');
const app = express();

const PORT = 9001;

// Routes
app.get('/', (req, res) => {
    // Will add some logic here later
    res.send('Hello from the server!');
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