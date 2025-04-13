import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Dashboard from './components/Dashboard';
import MyTask from './components/MyTask';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<MyTask />} />
            <Route path="/tasks/create" element={<CreateTask />} />
            <Route path="/tasks/edit/:id" element={<EditTask />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
