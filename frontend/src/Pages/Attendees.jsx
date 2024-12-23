import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Attendees.css";

const Attendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newAttendee, setNewAttendee] = useState({ name: "", eventName: "", taskName: "" });

  // Fetch attendees from the server
  const fetchAttendees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getAttendees");
      console.log(response.data);
      setAttendees(response.data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  // Fetch events from the server
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getEvents");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getTasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new attendee
  const addAttendee = async () => {

    if(newAttendee.name===""||newAttendee.eventName===""||newAttendee.taskName==="")
    {
      alert("Field is missing");
      return ;
    }
    try {
      console.log(newAttendee);
      const data=await axios.post("http://localhost:5000/api/postAttendee",newAttendee);
      console.log("Data Received ",data);
      fetchAttendees();
      setNewAttendee({ name: "", eventName: "", taskName: "" });
    } catch (error) {
      console.error("Error adding attendee:", error);
    }
  };

  // Delete an attendee
  const deleteAttendee = async (name) => {
    try {
      await axios.delete("http://localhost:5000/api/deleteAttendee", {
        data: { name: name },
      });
      fetchAttendees();
    } catch (error) {
      console.error("Error deleting attendee:", error);
    }
  };

  useEffect(() => {
    fetchAttendees();
    fetchEvents();
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      <h1>Attendees Dashboard</h1>

      <div className="add-attendee">
        <h2>Add Attendee</h2>
        <input
          type="text"
          placeholder="Attendee Name"
          value={newAttendee.name}
          onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
        />

        <select
          value={newAttendee.eventName}
          onChange={(e) => setNewAttendee({ ...newAttendee, eventName: e.target.value })}
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event._id} value={event.name}>
              {event.name}
            </option>
          ))}
        </select>

        <select
          value={newAttendee.taskName}
          onChange={(e) => setNewAttendee({ ...newAttendee, taskName: e.target.value })}
        >
          <option value="">Select Task</option>
          {tasks.map((task) => (
            <option key={task._id} value={task.name}>
              {task.name}
            </option>
          ))}
        </select>

        <button onClick={addAttendee}>Add</button>
      </div>

      <div className="attendee-list">
        <h2>Attendees List</h2>
        {attendees.map((attendee) => (
          <div key={attendee._id} className="attendee-item">
            <span>{attendee.name}</span>
            <span>{attendee.eventName || "No Event"}</span>
            <span>{attendee.taskName || "No Task"}</span>
            <button onClick={() => deleteAttendee(attendee.name)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendees;
