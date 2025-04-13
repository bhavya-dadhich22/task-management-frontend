import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch dashboard data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const pendingCount = tasks.filter((task) => task.status === "pending").length;
  const inProgressCount = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const totalExpenses = tasks.reduce(
    (sum, task) => sum + (task.actualExpendMoney || 0),
    0
  );
  return (
    <div className="dashboard">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="dashboard-widgets">
          <div className="widget">
            <h4>Total Pending Tasks</h4>
            <p>{pendingCount}</p>
          </div>
          <div className="widget">
            <h4>Total In-Progress Tasks</h4>
            <p>{inProgressCount}</p>
          </div>
          <div className="widget">
            <h4>Total Completed Tasks</h4>
            <p>{completedCount}</p>
          </div>
          <div className="widget">
            <h4>Total Expenses</h4>
            <p>${totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
