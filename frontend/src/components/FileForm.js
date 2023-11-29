// FileUploadForm.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Import the Modal component
import './FileForm.css';

const FileForm = ({ isOpen, onClose, onSubmit }) => {
  const [analysisType, setAnalysisType] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);

  const handleAnalysisTypeChange = (event) => {
    setAnalysisType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic for handling the form submission here
    // For now, we'll just log the values
    console.log('Analysis Type:', analysisType);
    console.log('Description:', description);
    console.log('Files:', files);

    // Check that analysis type and files are chosen
    if (!analysisType || files.length === 0) {
      return;
    }
    
    // Clear form fields
    setAnalysisType('');
    setDescription('');
    setFiles([]);
    onClose();
  };

  useEffect(() => {
    // Clear the input fields when the modal is opened
    if (isOpen) {
      setAnalysisType('');
      setDescription('');
      setFiles([]);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="file-modal">
      <div className="file-form">
        <form onSubmit={handleSubmit}>
          <label>Analysis Type:</label>
          <select value={analysisType} onChange={handleAnalysisTypeChange}>
            <option value="">Select Analysis Type</option>
            <option value="AxioScope">AxioScope</option>
            <option value="AxioImager">AxioImager</option>
            <option value="ZeissSEM">ZeissSEM</option>
            <option value="OxfordSEM">OxfordSEM</option>
          </select>

          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} />

          <label>Choose File(s):</label>
          <input type="file" multiple onChange={handleFileChange} />

          {(!analysisType || files.length === 0) && <p className="error-message">Sample Name is required</p>}

          <button type="submit">Add Files</button>
        </form>
      </div>
    </Modal>
  );
};

export default FileForm;
