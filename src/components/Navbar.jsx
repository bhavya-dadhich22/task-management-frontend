import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();  // To get the current path
  
  return (
    <div className="navbar">
      <h3 className='title'>Task Management</h3>
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/tasks" className={location.pathname === '/tasks' ? 'active' : ''}>
            My Task
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
