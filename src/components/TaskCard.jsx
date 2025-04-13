import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TaskCard.css';


const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3 className="task-name">{task.name}</h3>
      <p className="task-description">{task.description}</p>
      <p className="task-status">
        <strong>Status:</strong> {task.status}
      </p>
      <p className="task-due-date">
        <strong>Due Date:</strong> {task.dueDate}
      </p>
      <p className="task-budget">
        <strong>Budget:</strong> ${task.budget}
      </p>
      <div className="task-actions">
        <Link to={`/tasks/edit/${task._id}`} className="edit-btn">Edit</Link>
        <button className="delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this task?')) {
    // Perform delete action (API call, etc.)
    alert('Task deleted');
  }
};

export default TaskCard;
