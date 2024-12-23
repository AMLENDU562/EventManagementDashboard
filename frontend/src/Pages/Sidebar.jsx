import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Event', path: '/event' },
    { text: 'Task Tracker', path: '/tasktracker' },
    { text: 'Attendees', path: '/attendees' },
  ];

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
        <ul className={`menu ${isOpen ? '' : 'hidden'}`}>
          {menuItems.map((item) => (
            <li key={item.text} className="menu-item">
              <Link to={item.path}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>
     
    </div>
  );
};

export default Sidebar;
