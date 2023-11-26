// AnalysisPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMapsBySample } from '../api/apiClient'; // Import your API function

const AnalysisPage = () => {
  const { project_name, sample_name } = useParams();
  const [mapsByAnalysisType, setMapsByAnalysisType] = useState([]);

  useEffect(() => {
    // Fetch maps by sample when the component mounts
    async function fetchMaps() {
      try {
        const mapsData = await getMapsBySample(project_name, sample_name);
        setMapsByAnalysisType(mapsData);
      } catch (error) {
        console.error('Error fetching maps:', error);
      }
    }

    fetchMaps();
  }, [project_name, sample_name]);

  return (
    <div>
      {/* Display analysis types and maps */}
      {mapsByAnalysisType.map((analysis) => (
        <div key={analysis.analysisType}>
          <h2>{analysis.analysisType}</h2>
          <ul>
            {analysis.maps.map((map) => (
              <li key={map.map_name}>
                <p>{map.map_name}</p>
                {/* Display other map details here */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AnalysisPage;
