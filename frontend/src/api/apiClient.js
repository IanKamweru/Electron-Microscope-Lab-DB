import * as endpoints from './apiEndpoints';
import axios, * as others from 'axios';

// Function to fetch all projects
export const getAllProjects = async () => {
  try {
    const response = await axios.get(endpoints.PROJECTS_API.GET_ALL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch samples by project name
export const getSamplesByProject = async (projectName) => {
  try {
    const response = await axios.get(endpoints.SAMPLES_API.GET_BY_PROJECT(projectName));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to add a new project
export const addProject = async (newProjectData) => {
  try {
    const response = await axios.post(endpoints.PROJECTS_API.CREATE_PROJECT, newProjectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to add a new sample
export const addSample = async (newSampleData) => {
  try {
    const response = await axios.post(endpoints.SAMPLES_API.CREATE_SAMPLE, newSampleData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to fetch maps by sample
export const getMapsBySample = async (projectName, sampleName) => {
  try {
    const response = await axios.get(endpoints.MAPS_API.GET_BY_SAMPLE(projectName, sampleName));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to edit a project
export const editProject = async (updatedProjectData) => {
  try {
    //console.log('Request payload:', updatedProjectData);
    const response = await axios.put(endpoints.PROJECTS_API.EDIT_PROJECT, updatedProjectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to edit a sample
export const editSample = async (updatedSampleData) => {
  try {
    //console.log('Request payload:', updatedSampleData);
    const response = await axios.put(endpoints.SAMPLES_API.EDIT_SAMPLE, updatedSampleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more functions for sample, analysis, and map interactions as needed
