const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let courses = require('./data/courses.json');
let users = require('./data/users.json');

// Helper function to write data to file
function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(`Error writing to ${filename}:`, err);
        }
    });
}

// Routes


// Endpoint to serve courses data
app.get('/api/courses', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'courses.json'));
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

