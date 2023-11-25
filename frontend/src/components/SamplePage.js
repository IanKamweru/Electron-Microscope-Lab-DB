import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSamplesByProject } from '../api/apiClient';

const SamplePage = () => {
    const { project_name } = useParams();
    const [samples, setSamples] = useState([]);

  useEffect(() => {
    // Fetch samples for the selected project when the component mounts
    async function fetchSamples() {
      try {
        const samplesData = await getSamplesByProject(project_name);
        setSamples(samplesData);
      } catch (error) {
        console.error('Error fetching samples:', error);
      }
    }

    fetchSamples();
  }, [project_name]);

  return (
    <div>
      <h1>Samples for Project: {project_name}</h1>
      {/* Display sample information here */}
      <ul>
        {samples.map((sample) => (
          <li key={sample.sample_name}>
            <h2>{sample.sample_name}</h2>
            <p>{sample.sampling_locality}</p>
            <p>{sample.year_sampled}</p>
            {/* Display other sample details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SamplePage;
