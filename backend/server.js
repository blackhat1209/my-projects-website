const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Projects API' });
});

// Projects endpoint
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title: 'Project 1',
      description: 'This is my first project',
      technologies: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/blackhat1209/project1',
      live: 'https://project1.example.com'
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'This is my second project',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
      github: 'https://github.com/blackhat1209/project2',
      live: 'https://project2.example.com'
    }
  ];
  res.json(projects);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
