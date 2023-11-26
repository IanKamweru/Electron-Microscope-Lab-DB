import express from 'express';
const mapRouter = express.Router();
import db from '../db.js';
import Map from '../models/Map.js';

// Function to get all maps for a specific analysis ID under a sample name
mapRouter.get('/:projectName/:sampleName/:analysisId', async (req, res) => {
  const projectName = req.params.projectName;
  const sampleName = req.params.sampleName;
  const analysisId = req.params.analysisId;

  try {
    const maps = await db.any('SELECT * FROM Map WHERE sample_name = $1 AND project_name = $2 AND analysis_id = $3', [sampleName, projectName, analysisId]);
    const mapObjects = maps.map(map => new Map(map.map_name, map.map_description, map.map_type, map.file_path, map.date_created, map.analysis_id, map.sample_name, map.project_name));
    res.json(mapObjects);
  } catch (error) {
    res.status(500).json({ error: `Error getting maps for project ${projectName}, sample ${sampleName}, and analysis ID ${analysisId}.` });
  }
});

// Function to add a new map for a specific analysis ID under a sample name
mapRouter.post('/:projectName/:sampleName/:analysisId', async (req, res) => {
  const projectName = req.params.projectName;
  const sampleName = req.params.sampleName;
  const analysisId = req.params.analysisId;
  const { map_name, map_description, map_type, file_path, date_created } = req.body;

  try {
    const createdMap = await db.one('INSERT INTO Map (map_name, map_description, map_type, file_path, date_created, analysis_id, sample_name, project_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [map_name, map_description, map_type, file_path, date_created, analysisId, sampleName, projectName]);

    const mapObject = new Map(
      createdMap.map_name,
      createdMap.map_description,
      createdMap.map_type,
      createdMap.file_path,
      createdMap.date_created,
      createdMap.analysis_id,
      createdMap.sample_name,
      createdMap.project_name
    );

    res.status(201).json(mapObject);
  } catch (error) {
    res.status(500).json({ error: `Error creating a map for project: ${projectName}, sample: ${sampleName}, and analysisID: ${analysisId}.` });
  }
});

// Function to get all maps of a sample grouped by known analysis types
mapRouter.get('/:projectName/:sampleName', async (req, res) => {
  const projectName = req.params.projectName;
  const sampleName = req.params.sampleName;

  try {
    // Define the known analysis types
    const knownAnalysisTypes = ['AxioImager', 'AxioScope', 'ZeissSEM', 'OxfordSEM'];

    // Fetch maps for each known analysis type
    const mapsByAnalysisType = await Promise.all(knownAnalysisTypes.map(async (type) => {
      const maps = await db.any(`
        SELECT Map.*, Analysis.analysis_type
        FROM Map
        JOIN Analysis ON Map.analysis_id = Analysis.analysis_id
        WHERE Map.sample_name = $1 AND Map.project_name = $2 AND Analysis.analysis_type = $3
      `, [sampleName, projectName, type]);

      return { analysisType: type, maps: maps.map(map => new Map(map.map_name, map.map_description, map.map_type, map.file_path, map.date_created, map.analysis_id, map.sample_name, map.project_name)) };
    }));

    res.json(mapsByAnalysisType);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Add more CRUD routes for maps as needed

export default mapRouter;
