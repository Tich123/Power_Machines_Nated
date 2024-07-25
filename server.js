const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to get courses data
app.get('/api/courses', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'courses.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading courses data');
            return;
        }
        res.json(JSON.parse(data));
    });
});
// User registration
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = { username, password };
    users.push(newUser);
    writeDataToFile('./data/users.json', users);
    res.status(201).json({ message: 'User registered successfully' });
});

// User login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful', username });
});

// Serve static files
app.use(express.static('public'));


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

