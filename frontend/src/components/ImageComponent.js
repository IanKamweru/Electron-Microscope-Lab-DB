// ImageComponent.js

import React from 'react';
import Gallery from 'react-image-gallery';
import './ImageComponent.css';

const ImageComponent = ({ imagePath }) => {
  const image = {
    original: `/data/${imagePath}`,
  };

  const default_image = {
    original: '/no-image.png',
  };

  const isImage = imagePath ? ['.tif', '.png', '.jpg', '.jpeg', '.gif'].includes(imagePath.substring(imagePath.lastIndexOf('.'))) : false;

  const handleShowInFolder = () => {
    // TO-DO
  };

  return (
    <div className="image-container">
      <div className="image-info-bar">
        <div className="image-path">{imagePath}</div>
        <button onClick={handleShowInFolder}>Show in Folder</button>
      </div>
      {/* Conditionally render Gallery or default image */}
      {isImage ? (
        <Gallery items={[image]} />
      ) : (
        <Gallery items={[default_image]} />
      )}
    </div>
  );
};

export default ImageComponent;
