import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../api/apiClient'; // Import your API function

function ProjectsList() {
  const [projects, setProjects] = useState([]);

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

  return (
    <div>
      <h1>Projects List</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.project_name}>
            <h2>{project.project_name}</h2>
            <p>{project.goal}</p>
            <p>{project.supervising_professor}</p>
            {/* Display other project details here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsList;
