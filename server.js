const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Route to get courses data
app.get('/api/courses', (req, res) => {
    const filePath = path.join(__dirname, 'courses.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading courses data:', err);
            res.status(500).send('Error reading courses data');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

