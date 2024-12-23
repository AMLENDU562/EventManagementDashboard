import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/taskDashboard.css';

export default function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({ name: '', deadline: '', status: false, event: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getTasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/postTask', taskForm);
      setTaskForm({ name: '', deadline: '', status: false, eventName: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Update an existing task
  const updateTask = async (name) => {
    try {
      
      console.log(name);
      await axios.put(`http://localhost:5000/api/changeTaskStatus`, {name:name});
      setEditingTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (name) => {
    try {
      console.log(name);
      await axios.delete(`http://localhost:5000/api/deleteTask`,{data:{name:name}});
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name);
    setTaskForm({
      ...taskForm,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Task Management Dashboard</h1>

      <form className="task-form" onSubmit={editingTaskId ? updateTask : addTask}>
        <input
          type="text"
          name="name"
          placeholder="Task Name"
          value={taskForm.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="deadline"
          value={taskForm.deadline}
          onChange={handleInputChange}
        />
        
        <input
          type="text"
          name="eventName"
          placeholder="event"
          value={taskForm.eventName}
          onChange={handleInputChange}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.name}</h3>
            <p>Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}</p>
            <p>Status: {task.status ? 'Completed' : 'Pending'}</p>
            <p>Event : {task.event || 'Unlinked'}</p>
            <button onClick={(e) => { e.preventDefault(); 
              updateTask(task.name)}}>
              Update Status
            </button>
            <button onClick={() => deleteTask(task.name)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
