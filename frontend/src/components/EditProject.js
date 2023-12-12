// EditProject.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './EditProject.css'; 
import { editProject } from '../api/apiClient';

const EditProject = ({ isOpen, onClose, projectData }) => {
  const [editedProjectName, setEditedProjectName] = useState('');
  const [editedProjectGoal, setEditedProjectGoal] = useState('');
  const [editedSupervisingProfessor, setEditedSupervisingProfessor] = useState('');
  const [editedStudentResearchers, setEditedStudentResearchers] = useState('');

  useEffect(() => {
    // Set the initial values when the modal is opened
    if (isOpen) {
      setEditedProjectName(projectData.project_name);
      setEditedProjectGoal(projectData.goal);
      setEditedSupervisingProfessor(projectData.supervising_professor);
      setEditedStudentResearchers(projectData.student_researchers.join(', '));
    }
  }, [isOpen, projectData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Edited Project Name cannot be blank
    if (!editedProjectName.trim()) {
      return;
    }

    // Split edited student researchers into an array
    const editedResearchersArray = editedStudentResearchers.split(',').map((researcher) => researcher.trim());
    const editedProjectData = {
      project_name: editedProjectName,
      supervising_professor: editedSupervisingProfessor,
      goal: editedProjectGoal,
      student_researchers: editedResearchersArray,
    };

    try {
      await editProject(editedProjectData);
      console.log('Project edited successfully!');

      // Clear form fields
      setEditedProjectName('');
      setEditedProjectGoal('');
      setEditedSupervisingProfessor('');
      setEditedStudentResearchers('');
    } catch (error) {
      console.error('Failed to edit project:', error.message);
    }

    // Close the modal after submission
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="edit-project-form" onSubmit={handleSubmit}>
        <label>Project Name:</label>
        <input
          type="text"
          value={editedProjectName}
          onChange={(e) => setEditedProjectName(e.target.value)}
          disabled
        />
        
        <label>Supervising Professor:</label>
        <input
          type="text"
          value={editedSupervisingProfessor}
          onChange={(e) => setEditedSupervisingProfessor(e.target.value)}
        />
        
        <label>Student Researchers:</label>
        <input
          type="text"
          value={editedStudentResearchers}
          onChange={(e) => setEditedStudentResearchers(e.target.value)}
          placeholder="Separate with commas"
        />
        
        <label>Project Goal:</label>
        <textarea value={editedProjectGoal} onChange={(e) => setEditedProjectGoal(e.target.value)} />

        {!editedProjectName.trim() && <p className="error-message">Edited Project Name is required</p>}
        <button type="submit">Save Changes</button>
      </form>
    </Modal>
  );
};

export default EditProject;
