const API_BASE = '/api';

export const PROJECTS_API = {
  GET_ALL: `${API_BASE}/projects`,
  CREATE_PROJECT: `${API_BASE}/projects`,
};

export const SAMPLES_API = {
  CREATE_SAMPLE: `${API_BASE}/samples`,
  GET_BY_PROJECT: (projectName) => `${API_BASE}/samples/${projectName}`,
};

export const ANALYSES_API = {
  CREATE_ANALYSIS: `${API_BASE}/analyses`,
  GET_BY_SAMPLE: (sampleName, projectName) =>
    `${API_BASE}/analyses/${projectName}/${sampleName}`,
};

export const MAPS_API = {
  CREATE: (analysisId, sampleName, projectName) =>
    `${API_BASE}/maps/${analysisId}/${sampleName}/${projectName}`,
  GET_BY_ANALYSIS: (analysisId, sampleName, projectName) =>
    `${API_BASE}/maps/${analysisId}/${sampleName}/${projectName}`,
  GET_BY_SAMPLE: (sampleName, projectName) =>
    `${API_BASE}/maps/${sampleName}/${projectName}`,
};
