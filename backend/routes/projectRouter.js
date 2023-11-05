const express = require('express');
const router = express.Router();
const db = require('../db');
const Project = require('../models/Project');

// Function to get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await db.any('SELECT * FROM Project');
    const projectObjects = projects.map(project => new Project(project.project_name, project.supervising_professor, project.student_researchers, project.goal));
    console.log('Projects:', projects);
    res.json(projectObjects);
  } catch (error) {
    res.status(500).json({ error: `Error getting projects: ${error.message}` });
  }
});

// Function to create a new project
router.post('/', async (req, res) => {
  try {
    const newProject = req.body;
    const createdProject = await db.one('INSERT INTO Project (project_name, supervising_professor, student_researchers, goal) VALUES ($1, $2, $3, $4) RETURNING *', [newProject.project_name, newProject.supervising_professor, newProject.student_researchers, newProject.goal]);
    const projectObject = new Project(createdProject.project_name, createdProject.supervising_professor, createdProject.student_researchers, createdProject.goal);
    res.status(201).json(projectObject);
  } catch (error) {
    res.status(500).json({ error: `Error getting projects: ${error.message}` });
  }
});

// Add more CRUD routes for projects as needed

module.exports = router;
