import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Event.css';

export default function Event() {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState({});
  const [editingEventName, setEditingEventName] = useState(null);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getEvents');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchTasksForEvent = async (eventName) => {
    try {
      console.log(eventName);
      const response = await axios.get('http://localhost:5000/api/getEventTasks',{params: {
        name: eventName
      }});
      setTasks((prevTasks) => ({
        ...prevTasks,
        [eventName]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching tasks for event:', error);
    }
  };

  const toggleTasks = (eventName) => {
    if (tasks[eventName]) {
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        delete updatedTasks[eventName];
        return updatedTasks;
      });
    }

    else
      fetchTasksForEvent(eventName);
    
  };

  const deleteTask = async (eventName, taskId) => {
    try {
      await axios.delete('http://localhost:5000/deleteEventTask', {
        data: { eventName, taskId },
      });
      fetchTasksForEvent(eventName);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const deleteEvent = async (eventName) => {
    try {
      await axios.delete('http://localhost:5000/api/deleteEvent', {
        data: { name: eventName },
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const updateEvent = async () => {
    let endpoint = '';
    switch (editField) {
      case 'date':
        endpoint = 'http://localhost:5000/api/updateEventDate';
        break;
      case 'description':
        endpoint = 'http://localhost:5000/api/updateEventDescription';
        break;
      case 'location':
        endpoint = 'http://localhost:5000/api/updateEventLocation';
        break;
      default:
        console.error('Invalid edit field');
        return;
    }
    try {
      await axios.put(endpoint, { name: editingEventName, [editField]: editValue });
      fetchEvents();
      cancelEditing();
    } catch (error) {
      console.error(`Error updating event ${editField}:`, error);
    }
  };

  const addEvent = async () => {
    try {
      if (!newEvent.name || !newEvent.date || !newEvent.location || !newEvent.description) {
        alert('All fields are required!');
        return;
      }
      await axios.post('http://localhost:5000/api/postEvent', newEvent);
      fetchEvents();
      setNewEvent({ name: '', date: '', location: '', description: '' });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const startEditing = (eventName, field, currentValue) => {
    setEditingEventName(eventName);
    setEditField(field);
    setEditValue(currentValue);
  };

  const cancelEditing = () => {
    setEditingEventName(null);
    setEditField('');
    setEditValue('');
  };

  return (
    <div className="event-page">
      <h1>Event Management</h1>

      <div className="add-event-form">
        <h2>Add New Event</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        ></textarea>
        <button onClick={addEvent}>Add Event</button>
      </div>

      <div className="event-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              
              <React.Fragment key={event._id}>
                <tr>
                  <td>{event.name}</td>
                  <td>
                    {editingEventName === event.name && editField === 'date' ? (
                      <input
                        type="date"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    ) : (
                      <>
                        {new Date(event.date).toLocaleDateString()}
                        <button onClick={() => startEditing(event.name, 'date', event.date)}>Edit</button>
                      </>
                    )}
                  </td>
                  <td>
                    {editingEventName === event.name && editField === 'location' ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    ) : (
                      <>
                        {event.location}
                        <button onClick={() => startEditing(event.name, 'location', event.location)}>Edit</button>
                      </>
                    )}
                  </td>
                  <td>
                    {editingEventName === event.name && editField === 'description' ? (
                      <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    ) : (
                      <>
                        {event.description}
                        <button
                          onClick={() => startEditing(event.name, 'description', event.description)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </td>
                  <td>
                    {editingEventName === event.name ? (
                      <>
                        <button onClick={updateEvent}>Save</button>
                        <button onClick={cancelEditing}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => toggleTasks(event.name)}>
                          {tasks[event.name] ? 'Hide Tasks' : 'Show Tasks'}
                        </button>
                        <button onClick={() => deleteEvent(event.name)}>Delete Event</button>
                      </>
                    )}
                  </td>
                </tr>
                {tasks[event.name] && (
                  <tr>
                    <td colSpan="5">
                      <table className="task-table">
                        <thead>
                          <tr>
                            <th>Task Name</th>
                            <th></th>
                            <th></th>
                            <th>Actions</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          {tasks[event.name].map((task) => (
                            <tr key={task._id}>
                              <td>{task.name}</td>
                              <td>
                                <button onClick={() => deleteTask(task.name)}>Delete Task</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
