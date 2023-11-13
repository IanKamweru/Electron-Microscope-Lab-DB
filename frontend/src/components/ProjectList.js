import React, { useEffect, useState } from 'react';
import { getAllProjects, getSamplesByProject } from '../api/apiClient'; // Import your API functions

function ProjectsList() {
  const [projects, setProjects] = useState([]);

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
            <ul>
              {project.samples && project.samples.map((sample) => (
                <li key={sample.sample_name}>
                  <p>{sample.sampling_locality}</p>
                  {/* Display other sample details here */}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsList;
