const API_BASE = 'http://localhost:5000/api';

const PROJECTS_API = {
  GET_ALL: `${API_BASE}/projects`,
  CREATE_PROJECT: `${API_BASE}/projects`,
};

const SAMPLES_API = {
  CREATE_SAMPLE: `${API_BASE}/samples`,
  GET_BY_PROJECT: (projectName) => `${API_BASE}/samples?projectName=${projectName}`,
};

const ANALYSES_API = {
  CREATE_ANALYSIS: `${API_BASE}/analyses`,
  GET_BY_SAMPLE: (sampleName, projectName) =>
    `${API_BASE}/analyses?projectName=${projectName}&sampleName=${sampleName}`,
};

const MAPS_API = {
  CREATE: (analysisId, sampleName, projectName) =>
    `${API_BASE}/maps?analysisId=${analysisId}&sampleName=${sampleName}&projectName=${projectName}`,
  GET_BY_ANALYSIS: (analysisId, sampleName, projectName) =>
    `${API_BASE}/maps?analysisId=${analysisId}&sampleName=${sampleName}&projectName=${projectName}`,
};

module.exports = {
  PROJECTS_API,
  SAMPLES_API,
  ANALYSES_API,
  MAPS_API,
};