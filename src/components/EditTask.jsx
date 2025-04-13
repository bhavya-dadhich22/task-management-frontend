import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EditTask.css";
import { useNavigate, useParams } from "react-router-dom";
import { convertDateYYYYMMDD } from "../utils";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log("data-task.planDate: ", id);
  const [task, setTask] = useState({
    categoryName: "",
    description: "",
    status: "Pending",
    budget: "",
    actualExpendMoney: "",
    planDate: "",
    purchaseDate: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(`/api/tasks/${id}`);
        // console.log("data-status:", data);
        setTask(data);
      } catch (err) {
        console.error(err);
        alert("Error fetching task");
      }
    };
    fetchTask();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/tasks/${id}`, task);
      // alert("Task updated successfully!");
      navigate("/tasks", { state: { isEdited: true } });
      // Redirect or update UI after successful update
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  console.log("data-task:", task);

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      <form className="edit-task-form" onSubmit={handleSubmit}>
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
          className="edit-task-form"
          name="status"
          value={task.status}
          onChange={handleInputChange}
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
          placeholder="Budget"
          value={task.budget}
          onChange={handleInputChange}
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
          Planed Date<span className="required">*</span>
        </label>
        <input
          type="date"
          name="planDate"
          value={task.planDate ? convertDateYYYYMMDD(task.planDate) : ""}
          onChange={handleInputChange}
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
          value={task.description}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
