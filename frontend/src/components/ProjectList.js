import React, { useEffect, useState } from 'react';
import { getAllProjects, getSamplesByProject } from '../api/apiClient'; // Import your API functions
import "./ProjectList.css"

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);

  useEffect(() => {
    // Fetch projects when the component mounts
    async function fetchProjects() {
      try {
        const projectsData = await getAllProjects();
        // Fetch and attach samples for each project
        const projectsWithSamples = await Promise.all(
          projectsData.map(async (project) => {
            const samplesData = await getSamplesByProject(project.project_name);
            return { ...project, samples: samplesData };
          })
        );
        setProjects(projectsWithSamples);
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
    console.log("filteredData: ", filteredData);
    setFilteredResults(filteredData)
  }

  const handleOnClick = () => { 
    const filteredData = projects.filter((project) => {
      return Object.values(project).join('').toLowerCase().includes(searchInput.toLowerCase())
    })
    console.log("filteredData: ", filteredData);
    setFilteredResults(filteredData)
  }

  console.log("search input: ", searchInput)

  return (
    <div className='center'>
      <div className='searchButton'>
      <input type='text'
                placeholder='Search by project name, researcher, supervisor, goal...'
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}
                className = "search-input"
            />
       <button className="btn" onClick={handleOnClick}> Search
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
            <td>{project.project_name}</td>
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
            <td>{project.project_name}</td>
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
       
    </div>
  );
}


export default ProjectList;
