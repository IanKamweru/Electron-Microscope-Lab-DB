// EditSample.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './EditSample.css';
import { editSample } from '../api/apiClient';

const EditSample = ({ isOpen, onClose, sampleData }) => {
  const [editedSampleName, setEditedSampleName] = useState('');
  const [editedSamplingLocality, setEditedSamplingLocality] = useState('');
  const [editedDateSampled, setEditedDateSampled] = useState('');
  const [editedStudentSamplers, setEditedStudentSamplers] = useState('');
  const [editedNotes, setEditedNotes] = useState('');

  useEffect(() => {
    // Set the initial values when the modal is opened
    if (isOpen) {
      setEditedSampleName(sampleData.sample_name);
      setEditedSamplingLocality(sampleData.sampling_locality);
      setEditedDateSampled(sampleData.year_sampled ? new Date(sampleData.year_sampled).toISOString().split('T')[0] : '');
      setEditedStudentSamplers(sampleData.student_samplers.join(', '));
      setEditedNotes(sampleData.notes);
    }
  }, [isOpen, sampleData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Edited Sample Name cannot be blank
    if (!editedSampleName.trim()) {
      return;
    }

    // Split edited student samplers into an array
    const editedSamplersArray = editedStudentSamplers.split(',').map((sampler) => sampler.trim());
    const editedSampleData = {
      sample_name: editedSampleName,
      sampling_locality: editedSamplingLocality,
      year_sampled: editedDateSampled,
      student_samplers: editedSamplersArray,
      notes: editedNotes,
    };

    try {
      await editSample(editedSampleData);
      console.log('Sample edited successfully!');

      // Clear form fields
      setEditedSampleName('');
      setEditedSamplingLocality('');
      setEditedDateSampled('');
      setEditedStudentSamplers('');
      setEditedNotes('');
    } catch (error) {
      console.error('Failed to edit sample:', error.message);
    }

    // Close the modal after submission
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="edit-sample-form" onSubmit={handleSubmit}>
        <label>Sample Name:</label>
        <input
          type="text"
          value={editedSampleName}
          onChange={(e) => setEditedSampleName(e.target.value)}
          disabled
        />

        <label>Sampling Locality:</label>
        <input
          type="text"
          value={editedSamplingLocality}
          onChange={(e) => setEditedSamplingLocality(e.target.value)}
        />

        <label>Date Sampled:</label>
        <input
          type="date"
          value={editedDateSampled}
          onChange={(e) => setEditedDateSampled(e.target.value)}
        />

        <label>Student Samplers:</label>
        <input
          type="text"
          value={editedStudentSamplers}
          onChange={(e) => setEditedStudentSamplers(e.target.value)}
          placeholder="Separate with commas"
        />

        <label>Notes:</label>
        <textarea
          value={editedNotes}
          onChange={(e) => setEditedNotes(e.target.value)}
        />

        {!editedSampleName.trim() && <p className="error-message">Edited Sample Name is required</p>}
        <button type="submit">Save Changes</button>
      </form>
    </Modal>
  );
};

export default EditSample;
