// SampleForm.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './SampleForm.css';
import { addSample } from '../api/apiClient';

const SampleForm = ({ isOpen, onClose, project_name }) => {
  const [sampleName, setSampleName] = useState('');
  const [samplingLocality, setSamplingLocality] = useState('');
  const [dateSampled, setDateSampled] = useState('');
  const [studentSamplers, setStudentSamplers] = useState('');
  const [notes, setNotes] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validate sample name
    if (!sampleName.trim()) {
      return;
    }

    const newSampleData = {
      sample_name: sampleName,
      sampling_locality: samplingLocality,
      year_sampled: dateSampled,
      student_samplers: studentSamplers.split(',').map((s) => s.trim()),
      notes: notes,
      project_name: project_name, // Pass the project_name from props
    };

    try {
      const createdSample = await addSample(newSampleData);

      console.log('Sample added:', createdSample);

      // Clear the input fields
      setSampleName('');
      setSamplingLocality('');
      setDateSampled('');
      setStudentSamplers('');
      setNotes('');

      onClose();
    } catch (error) {
      console.error('Error adding sample:', error);
    }
  };

  useEffect(() => {
    // Clear the input fields when the modal is opened
    if (isOpen) {
      setSampleName('');
      setSamplingLocality('');
      setDateSampled('');
      setStudentSamplers('');
      setNotes('');
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={() => { onClose() }}>
      <form className="sample-form" onSubmit={handleFormSubmit}>
        <label>Sample Name:</label>
        <input type="text" value={sampleName} onChange={(e) => setSampleName(e.target.value)} />

        {/* Other form fields */}
        <label>Sampling Locality:</label>
        <input type="text" value={samplingLocality} onChange={(e) => setSamplingLocality(e.target.value)} />

        <label>Date Sampled:</label>
        <input
          type="date"
          value={dateSampled}
          onChange={(e) => setDateSampled(e.target.value)}
        />

        <label>Student Samplers:</label>
        <input
          type="text"
          value={studentSamplers}
          onChange={(e) => setStudentSamplers(e.target.value)}
          placeholder="Separate with commas"
        />

        <label>Notes:</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />

        {/* Display validation error message */}
        {!sampleName.trim() && <p className="error-message">Sample Name is required</p>}

        <button type="submit">Add Sample</button>
      </form>
    </Modal>
  );
};

export default SampleForm;
