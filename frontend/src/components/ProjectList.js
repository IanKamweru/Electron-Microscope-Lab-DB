import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects } from '../api/apiClient'; // Import your API functions
import "./ProjectList.css"
import ProjectForm from './ProjectForm';
import { FiEdit } from 'react-icons/fi';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    // Fetch projects when the component mounts
    async function fetchProjects() {
      try {
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    const filteredData = projects.filter((project) => {
      return Object.values(project).join('').toLowerCase().includes(searchInput.toLowerCase())
    })
    setFilteredResults(filteredData)
  }

  const handleOnClick = () => { 
    const filteredData = projects.filter((project) => {
      return Object.values(project).join('').toLowerCase().includes(searchInput.toLowerCase())
    })
    setFilteredResults(filteredData)
  }

  const handleAddProject = () => {
    setIsFormOpen(true);
  }

  const handleEditProject = (project) => {
  
  }

  return (
    <div className='center'>
      <div className='search-container'>
        <button className='btn addProjectButton' onClick={handleAddProject}>
          Add Project
        </button>
        <input
          type='text'
          placeholder='Search by project name, researcher, supervisor, goal...'
          value={searchInput}
          onChange={(e) => searchItems(e.target.value)}
          className='search-input'
        />
        <button className='btn' onClick={handleOnClick}>
          Search
        </button>
      </div>
      <div className='table-container'>
      <table className="table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Goal Of Project</th>
            <th>Supervising Professor</th>
            <th>Student Researchers</th>
          </tr>
        </thead>
            <tbody>
      {searchInput === '' ? (
        // Render all projects when the searchTerm is empty
        projects.map((project) => (
          <tr key={project.project_name}>
            <td> 
              <Link to={`/${project.project_name}/samples`}>{project.project_name}</Link>
              <span className="edit-icon" onClick={() => handleEditProject(project)}>
                  <FiEdit />
              </span>
            </td>
            <td>{project.goal}</td>
            <td>{project.supervising_professor}</td>
            <td>{project.student_researchers.map((researcher) => (
              <p>{researcher}</p>
            ))}</td>
          </tr>
        ))
      ) : (
        // Render filtered projects based on the searchTerm
        filteredResults.map((project) => (
          <tr key={project.project_name}>
            <td>
              <Link to={`/${project.project_name}/samples`}>{project.project_name}</Link>
              <span className="edit-icon" onClick={() => handleEditProject(project)}>
                    <FiEdit />
              </span>
            </td>
            <td>{project.goal}</td>
            <td>{project.supervising_professor}</td>
            <td>{project.student_researchers.map((researcher) => (
              <p>{researcher}</p>
            ))}</td>
          </tr>
        ))
      )}
    </tbody>
      </table>
      </div>
      
      <ProjectForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}

export default ProjectList;
