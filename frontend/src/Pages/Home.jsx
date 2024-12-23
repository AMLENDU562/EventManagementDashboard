import React from 'react';
import '../styles/Home.css'; // Import a CSS file for styling the cards
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
        <Link to="/event">
      <div className="card">
        <h2>Event Management</h2>
        <p>Manage events efficiently and effectively.</p>
      </div>
      </Link>

      <Link to="/tasktracker">

      <div className="card">
        <h2>Task Tracker</h2>
        <p>Keep track of your tasks with ease.</p>
      </div>
      </Link>

    <Link to="/attendees">
      <div className="card">
        <h2>Attendees Management</h2>
        <p>Handle attendees seamlessly for your events.</p>
      </div>
      </Link>
    </div>
  );
}
