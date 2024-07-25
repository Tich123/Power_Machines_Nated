const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Dummy data to simulate a database
const courses = [
    {
        id: 1,
        title: 'Power Machines N6',
        description: 'Power Machines N6 is an advanced technical course designed for students pursuing a career in electrical engineering.',
        videoId: '1KWVo6RF9avrp1QWXzonS3S3JfR5AjgVd',
        quiz: {
            question: '1. State two advantages of a multi stage compressor over a single stage compressor?',
            options: ['Higher Efficiency & Increased Pressure Ratio', 'Lower Maintenance Costs & Lower Initial Cost', 'Simpler Operation & Suitable for Low Pressure Applications'],
            answer: 'Higher Efficiency & Increased Pressure Ratio'
        }
    },
    // Add more courses as needed
];
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

// Route to get a single course by ID
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == req.params.id);
    if (course) {
        res.json(course);
    } else {
        res.status(404).send('Course not found');
    }
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

