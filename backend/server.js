const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Route to get all courses
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

// Route to get a single course by ID
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == req.params.id);
    if (course) {
        res.json(course);
    } else {
        res.status(404).send('Course not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

