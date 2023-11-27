// ImageComponent.js

import React from 'react';
import Gallery from 'react-image-gallery';
import './ImageComponent.css';

const ImageComponent = ({ imagePath }) => {
  const image = {
    original: `/data/${imagePath}`,
  };


  const handleShowInFolder = () => {
    // TO-DO
  };

  return (
    <div className="image-container">
      <div className="image-info-bar">
        <div className="image-path">{imagePath}</div>
        <button onClick={handleShowInFolder}>Show in Folder</button>
      </div>
      <Gallery items={[image]} />
    </div>
  );
};

export default ImageComponent;
