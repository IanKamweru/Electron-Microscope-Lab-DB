import express from 'express';
const sampleRouter = express.Router();
import db from '../db.js';
import Sample from '../models/Sample.js';

// Function to get samples for a specific project
sampleRouter.get('/:projectName', async (req, res) => {
  const projectName = req.params.projectName;

  try {
    const samples = await db.any('SELECT * FROM Sample WHERE project_name = $1', projectName);
    const sampleObjects = samples.map(sample => new Sample(sample.sample_name, sample.student_samplers, sample.sampling_locality, sample.year_sampled, sample.notes, sample.project_name));
    console.log('Samples: ', samples);
    res.json(sampleObjects);
  } catch (error) {
    res.status(500).json({ error: 'Error getting samples for the specified project.' });
  }
});

// Function to create a new sample
sampleRouter.post('/', async (req, res) => {
  try {
    const newSample = req.body;
    const createdSample = await db.one('INSERT INTO Sample (sample_name, student_samplers, sampling_locality, year_sampled, notes, project_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [newSample.sample_name, newSample.student_samplers, newSample.sampling_locality, newSample.year_sampled, newSample.notes, newSample.project_name]);
    const sampleObject = new Sample(createdSample.sample_name, createdSample.student_samplers, createdSample.sampling_locality, createdSample.year_sampled, createdSample.notes, createdSample.project_name);
    res.status(201).json(sampleObject);
  } catch (error) {
    res.status(500).json({ error: 'Error creating a sample.' });
  }
});

// Add more CRUD routes for samples as needed

export default sampleRouter;
