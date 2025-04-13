import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDateToMMDDYYYY } from "../utils";
import "../styles/TaskTable.css";
import ConfirmModal from "./ConfirmModal";

const TaskTable = ({ tasks, onTaskDeleted }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const openConfirmModal = (message) => {
    setActionMessage(message);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log("Confirmed!");

    setIsModalOpen(false);
    axios.delete(`/api/tasks/${selectedId}`).then(() => {
      if (onTaskDeleted) {
        onTaskDeleted();
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    openConfirmModal("Are you sure you want to delete this item?");

    // if (window.confirm("Are you sure you want to delete this task?")) {
    //   // Delete task from API
    //   axios.delete(`/api/tasks/${id}`).then(() => {
    //     if (onTaskDeleted) {
    //       onTaskDeleted();
    //     }
    //     // alert('Task deleted');
    //   });
    // }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.categoryName}</td>
              <td>{task.status}</td>
              <td>{formatDateToMMDDYYYY(task.planDate)}</td>
              <td>
                {task.status !== "completed" && (
                  <Link to={`/tasks/edit/${task._id}`}>Edit</Link>
                )}
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmModal
        message={actionMessage}
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TaskTable;
