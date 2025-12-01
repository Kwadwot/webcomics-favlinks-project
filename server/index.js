const express = require('express');

const app = express();

const PORT = 9001;

// Routes
app.get('/', (req, res) => {
    // Will add some logic here later
    res.send('Hello from the server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});