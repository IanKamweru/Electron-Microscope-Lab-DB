// AnalysisPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMapsBySample } from '../api/apiClient';
import { FiFolder, FiFile } from 'react-icons/fi';

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

  // Helper function to convert file path into a file tree structure
  const buildFileTree = (analysisType, files) => {
    const fileTree = {};

    files.forEach((file) => {
      const pathComponents = file.file_path.split('/');
      
      // Find the index of the analysis type in the path
      const analysisIndex = pathComponents.indexOf(analysisType);
      
      // If the analysis type is found, start building the tree from that point
      if (analysisIndex !== -1) {
        let currentLevel = fileTree;
    
        // Trim the path until the analysis type folder
        const trimmedPath = pathComponents.slice(analysisIndex);
    
        trimmedPath.forEach((component, index) => {
          if (!currentLevel[component]) {
            currentLevel[component] = index === trimmedPath.length - 1 ? null : {};
          }
          currentLevel = currentLevel[component];
        });
      }
    });

    return fileTree;
  };

  // Function to recursively render the file tree
  const renderFileTree = (node) => {
    if (node === null) {
      return null;
    }

    return (
      <ul>
        {Object.entries(node).map(([name, value]) => (
          <li key={name}>
            {value === null ? (
              // If it's a file
              <div>
                <FiFile /> {name} {/* Display file icon */}
              </div>
            ) : (
              // If it's a folder
              <div>
                <FiFolder /> {name} {/* Display folder icon */}
                {renderFileTree(value)} {/* Recursively render child nodes */}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };


  return (
    <div>
      {/* Display file tree structure */}
      {mapsByAnalysisType.map((analysis) => (
        <div key={analysis.analysisType}>
          <h2>{analysis.analysisType}</h2>
          {renderFileTree(buildFileTree(analysis.analysisType, analysis.maps))}
        </div>
      ))}
    </div>
  );
};

export default AnalysisPage;
