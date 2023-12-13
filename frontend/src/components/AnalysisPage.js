// AnalysisPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMapsBySample } from '../api/apiClient';
import { FiFile, FiFolder, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import ImageComponent from './ImageComponent';
import FileForm from './FileForm';
import './AnalysisPage.css';

const AnalysisPage = () => {
  const { project_name, sample_name } = useParams();
  const [mapsByAnalysisType, setMapsByAnalysisType] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [originalPaths, setOriginalPaths] = useState([]);
  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const [isFileFormOpen, setFileFormOpen] = useState(false);


  useEffect(() => {
    // Fetch maps by sample when the component mounts
    async function fetchMaps() {
      try {
        const mapsData = await getMapsBySample(project_name, sample_name);
        setOriginalPaths(mapsData.map(file => file.file_path));
        setMapsByAnalysisType(mapsData);
      } catch (error) {
        console.error('Error fetching maps:', error);
      }
    }

    fetchMaps();
  }, [project_name, sample_name, originalPaths]);

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
          <li key={name}
              // Add event handlers to handle hover
              onMouseEnter={() => setHoveredItem(path + name)}
              onMouseLeave={() => setHoveredItem(null)}
              className={hoveredItem === path + name ? 'highlighted' : ''}
          >
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
                <div onClick={() => {
                  setSelectedImagePath(null);
                  setSelectedImagePath(project_name+'/'+sample_name+'/'+path+name); 
                }}>
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
    <div>
    <div className='centerhere'>
      <h1>{sample_name}</h1>
      </div>
    <div>
      {/* Add Files button */}
      <button className="add-files-button" onClick={() => setFileFormOpen(true)}>
        Add Files
      </button>
      <FileForm isOpen={isFileFormOpen} onClose={() => setFileFormOpen(false)} />

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
        <ImageComponent imagePath={selectedImagePath} />
      </div>
    </div>
    </div>
    </div>
  );
};

export default AnalysisPage;
