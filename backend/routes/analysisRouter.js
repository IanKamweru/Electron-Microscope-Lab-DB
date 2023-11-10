import express from 'express';
const analysisRouter = express.Router();
import db from '../db.js';
import Analysis from '../models/Analysis.js';

// Function to get all analyses for a specific sample in a specific project
analysisRouter.get('/:projectName/:sampleName', async (req, res) => {
    const projectName = req.params.projectName;
    const sampleName = req.params.sampleName;
    try {
      const analyses = await db.any('SELECT * FROM Analysis WHERE sample_name = $1 AND project_name = $2', [sampleName, projectName]);
      const analysisObjects = analyses.map(analysis => new Analysis(analysis.analysis_id, analysis.analysis_type, analysis.sample_name, analysis.project_name));
      res.json(analysisObjects);
    } catch (error) {
        res.status(500).json({ error: `Error getting analyses for project: ${projectName} , sample: ${sampleName}.` });
    }
  });
  

// Function to create a new analysis
analysisRouter.post('/', async (req, res) => {
  try {
    const newAnalysis = req.body;
    const createdAnalysis = await db.one('INSERT INTO Analysis (analysis_type, sample_name, project_name) VALUES ($1, $2, $3) RETURNING *', [newAnalysis.analysis_type, newAnalysis.sample_name, newAnalysis.project_name]);
    const analysisObject = new Analysis(createdAnalysis.analysis_id, createdAnalysis.analysis_type, createdAnalysis.sample_name, createdAnalysis.project_name);
    res.status(201).json(analysisObject);
  } catch (error) {
    res.status(500).json({ error: 'Error creating an analysis.' });
  }
});

// Add more CRUD routes for analyses as needed

export default analysisRouter;
