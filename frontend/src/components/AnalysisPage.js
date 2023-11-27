// AnalysisPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMapsBySample } from '../api/apiClient';
import { FiFile, FiFolder, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import './AnalysisPage.css';
import ImageComponent from './ImageComponent';

const AnalysisPage = () => {
  const { project_name, sample_name } = useParams();
  const [mapsByAnalysisType, setMapsByAnalysisType] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});

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

  // Helper function to toggle the expanded state of a folder
  const toggleFolder = (folder) => {
    setExpandedFolders((prevExpandedFolders) => ({
      ...prevExpandedFolders,
      [folder]: !prevExpandedFolders[folder],
    }));
  };

  // Helper function to recursively render the file tree
  const renderFileTree = (node, path = '') => {
    if (node === null) {
      return null;
    }

    return (
      <ul>
        {Object.entries(node).map(([name, value]) => (
          <li key={name}>
            <div>
              {value !== null && (
                // Render folder icon and toggle button
                <span onClick={() => toggleFolder(path + name)}>
                  {expandedFolders[path + name] ? <FiChevronDown /> : <FiChevronRight />}
                  <span style={{ color: 'blue' }}>
                  <FiFolder />
                </span> {name}
                </span>
              )}
              {value === null && (
                <div onClick={() => console.log('File clicked:', path + name)}>
                <FiFile /> {name}
              </div>
              )}
              {expandedFolders[path + name] && renderFileTree(value, path + name + '/')}
            </div>
          </li>
        ))}
      </ul>
    );
  };


  return (
    <div className="container">
      {/* Analysis component (occupying 30%) */}
      <div className="analysis-container">
        {mapsByAnalysisType.map((analysis) => (
          <div key={analysis.analysisType}>
            {renderFileTree(buildFileTree(analysis.analysisType, analysis.maps))}
          </div>
        ))}
      </div>
  
      {/* Image component (occupying 70%) */}
      <div className="image-container">
        {/* Include your ImageComponent component here with imagePath prop */}
        <ImageComponent imagePath='project_1/sample_1/AxioScope/21_GR_14Y_XPL_Cleavage_Zoning.jpg' />
      </div>
    </div>
  );
};

export default AnalysisPage;
