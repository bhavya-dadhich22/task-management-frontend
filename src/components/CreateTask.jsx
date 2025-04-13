import React, { useState } from "react";
import api from '../api/axios';
import { useNavigate } from "react-router-dom";
import "../styles/CreateTask.css";

const CreateTask = () => {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    categoryName: "",
    description: "",
    status: "pending",
    budget: "",
    actualExpendMoney: "",
    planDate: "",
    purchaseDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('data-task:', task);
    try {
      await api.post("/api/tasks", task);
      // alert("Task created successfully!");
      navigate("/tasks", { state: { isCreated: true } });
      // Redirect or clear form here if necessary
    } catch (err) {
      console.error(err);
      alert("Error creating task");
    }
  };

  return (
    <div className="create-task-container">
      <h2>Create Task</h2>
      <form className="create-task-form" onSubmit={handleSubmit}>
        <label htmlFor="categoryName">
          Task Name<span className="required">*</span>
        </label>
        <input
          type="text"
          name="categoryName"
          placeholder="Enter Task Name"
          value={task.categoryName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="status">
          Status<span className="required">*</span>
        </label>
        <select
          name="status"
          id="status"
          value={task.status}
          onChange={handleInputChange}
          required
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <label htmlFor="budget">
          Budget<span className="required">*</span>
        </label>
        <input
          type="number"
          name="budget"
          id="budget"
          placeholder="Enter budget"
          value={task.budget}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="actualExpendMoney">Actual Expenditure</label>
        <input
          type="number"
          name="actualExpendMoney"
          id="actualExpendMoney"
          placeholder="Enter actual expenditure"
          value={task.actualExpendMoney}
          onChange={handleInputChange}
        />
        <label htmlFor="planDate">
          {" "}
          Plan Date<span className="required">*</span>{" "}
        </label>{" "}
        <input
          type="date"
          name="planDate"
          id="planDate"
          value={task.planDate}
          onChange={handleInputChange}
          required
          // min={new Date().toISOString().split("T")[0]}
        />
        <label htmlFor="purchaseDate">Purchase Date</label>
        <input
          type="date"
          name="purchaseDate"
          id="purchaseDate"
          value={task.purchaseDate}
          onChange={handleInputChange}
        />
        <label htmlFor="description">
          Description<span className="required">*</span>
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="Enter task description"
          value={task.description}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
