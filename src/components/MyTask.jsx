import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TaskTable from "./TaskTable";
import axios from "axios";
// import '../styles/App.css';
import "../styles/Task.css";
import Snackbar from "./Snackbar";

const MyTask = () => {
  //hooks
  const location = useLocation();
  const isCreated = location.state?.isCreated;
  const isEdited = location.state?.isEdited;

  //states
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [error, setError] = useState(null); // Error state to track any API issues
  const [loading, setLoading] = useState(true); // Loading state to indicate API request in progress
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const filteredTasks = filterStatus
    ? tasks.filter((task) => task.status === filterStatus)
    : tasks;

  // methods
  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data); // Set tasks data when successful
      setLoading(false); // Stop loading once the data is fetched
    } catch (err) {
      setError("Failed to load tasks. Please try again later.");
      setLoading(false); // Stop loading even if there's an error
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []); // Fetch tasks when the component mounts

  useEffect(() => {
    if (isEdited || isCreated) {
      setSnackbarOpen(true);
      setSnackbarMessage(
        isCreated ? "Item created successfully" : "Item edited successfully"
      );
    }
  }, [isEdited, isCreated]);

  const handleFilterChange = (filter) => {
    setFilterStatus(filter);
  };

  const onTaskDeletedHanlder = () => {
    setSnackbarOpen(true);
    setSnackbarMessage("Item deleted successfully");
  };
  const onSnackbarClosed = () => {
    setSnackbarOpen(false);
    fetchTasks();
  };

  return (
    <div className="my-tasks">
      <h2>My Tasks</h2>
      {/* Filters Section */}
      <div className="filters">
  <div className="filtersInner">
    <button
      className={`filter-button ${filterStatus === "pending" ? "selected" : ""}`}
      onClick={() => handleFilterChange("pending")}
    >
      Pending
    </button>
    <button
      className={`filter-button ${filterStatus === "in-progress" ? "selected" : ""}`}
      onClick={() => handleFilterChange("in-progress")}
    >
      In Progress
    </button>
    <button
      className={`filter-button ${filterStatus === "completed" ? "selected" : ""}`}
      onClick={() => handleFilterChange("completed")}
    >
      Completed
    </button>
  </div>
  <button onClick={() => handleFilterChange("")}>Clear All</button>
</div>

      {/* Create Task Button */}
      <Link to="/tasks/create" className="create-task-btn">
        Create Task
      </Link>

      {/* Show error if there is any */}
      {error && <div className="error-message">{error}</div>}

      {/* Show loading indicator while data is being fetched */}
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        // Pass tasks to TaskTable if loaded successfully
        <TaskTable tasks={filteredTasks} onTaskDeleted={onTaskDeletedHanlder} />
      )}

      <Snackbar
        message={snackbarMessage}
        isOpen={snackbarOpen}
        onClose={onSnackbarClosed}
        duration={3000}
      />
    </div>
  );
};

export default MyTask;
