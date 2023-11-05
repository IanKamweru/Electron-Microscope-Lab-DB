const endpoints = require('./apiEndpoints');
const axios = require('axios');

// Function to fetch all projects
exports.getAllProjects = async () => {
  try {
    const response = await axios.get(endpoints.PROJECTS_API.GET_ALL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch samples by project name
exports.getSamplesByProject = async (projectName) => {
  try {
    const response = await axios.get(endpoints.SAMPLES_API.GET_BY_PROJECT(projectName));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more functions for sample, analysis, and map interactions as needed

/*const testGetAllProjects = async () => {
  try {
    const projects = await exports.getAllProjects();
    console.log(projects); // Log the result to the console
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the test function
testGetAllProjects();*/
