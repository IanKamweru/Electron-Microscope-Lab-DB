// EditProject.js
import React, { useState } from 'react';
import Modal from './Modal';

const EditProject = ({ project, onClose, onSave }) => {
  const [editedProject, setEditedProject] = useState({
    project_name: project.project_name,
    goal: project.goal,
    supervising_professor: project.supervising_professor,
    student_researchers: project.student_researchers.join(', '),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Add any additional validation or processing logic as needed
    onSave(editedProject);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div>
        <h2>Edit Project</h2>
        <label>
          Project Name:
          <input type="text" name="project_name" value={editedProject.project_name} onChange={handleInputChange} />
        </label>
        <label>
          Goal of Project:
          <input type="text" name="goal" value={editedProject.goal} onChange={handleInputChange} />
        </label>
        <label>
          Supervising Professor:
          <input type="text" name="supervising_professor" value={editedProject.supervising_professor} onChange={handleInputChange} />
        </label>
        <label>
          Student Researchers:
          <input type="text" name="student_researchers" value={editedProject.student_researchers} onChange={handleInputChange} />
        </label>
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProject;
