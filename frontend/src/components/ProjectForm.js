// ProjectForm.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './ProjectForm.css';

const ProjectForm = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState('');
  const [projectGoal, setProjectGoal] = useState('');
  const [supervisingProfessor, setSupervisingProfessor] = useState('');
  const [studentResearchers, setStudentResearchers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Project Name cannot be blank
    if (!projectName.trim()) {
      return;
    }

    // Split student researchers into an array
    const researchersArray = studentResearchers.split(',').map((researcher) => researcher.trim());

    // Handle the form submission logic here (for example, send data to an API)
    console.log('Form submitted with data:', {
      projectName,
      projectGoal,
      supervisingProfessor,
      studentResearchers: researchersArray,
    });

    setProjectName('');
    setProjectGoal('');
    setSupervisingProfessor('');
    setStudentResearchers('');

    // Close the modal after submission
    onClose();
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
