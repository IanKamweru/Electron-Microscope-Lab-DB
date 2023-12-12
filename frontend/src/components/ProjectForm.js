// ProjectForm.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './ProjectForm.css';
import { addProject } from '../api/apiClient';

const ProjectForm = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState('');
  const [projectGoal, setProjectGoal] = useState('');
  const [supervisingProfessor, setSupervisingProfessor] = useState('');
  const [studentResearchers, setStudentResearchers] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Project Name cannot be blank
    if (!projectName.trim()) {
      return;
    }

    // Split student researchers into an array
    const researchersArray = studentResearchers.split(',').map((researcher) => researcher.trim());
    const projectData = {
      project_name: projectName,
      supervising_professor: supervisingProfessor,
      goal: projectGoal,
      student_researchers: researchersArray,
    };

    try {
      await addProject(projectData);
      console.log('Project added successfully!');

      // Clear form fields
      setProjectName('');
      setProjectGoal('');
      setSupervisingProfessor('');
      setStudentResearchers('');
    } catch (error) {
      console.error('Failed to add project:', error.message);
    }

    // Close the modal after submission
    onClose();
    window.location.reload();
  };

  useEffect(() => {
    // Clear the input fields when the modal is opened
    if (isOpen) {
      setProjectName('');
      setProjectGoal('');
      setSupervisingProfessor('');
      setStudentResearchers('');
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={() => {
      onClose();
    }}>
      <form className="project-form" onSubmit={handleSubmit}>
        <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        
        <label>Supervising Professor:</label>
          <input
            type="text"
            value={supervisingProfessor}
            onChange={(e) => setSupervisingProfessor(e.target.value)}
          />
        
        <label>Student Researchers:</label>
          <input
            type="text"
            value={studentResearchers}
            onChange={(e) => setStudentResearchers(e.target.value)}
            placeholder="Separate with commas"
          />
        
        <label>
          Project Goal:
        </label>
        <textarea value={projectGoal} onChange={(e) => setProjectGoal(e.target.value)} />

        {!projectName.trim() && <p className="error-message">Project Name is required</p>}
        <button type="submit">Add Project</button>
      </form>
    </Modal>
  );
};

export default ProjectForm;
