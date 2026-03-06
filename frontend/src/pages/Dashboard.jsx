

import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../Dashboard.css"; 

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState(""); // current logged in user's ID
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Decode JWT to get role and id
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserRole(payload.role);
      setUserId(payload.id); // save logged-in user's id
    }
    fetchTasks();
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Create new task
  const createTask = async () => {
    if (!title || !description) return;
    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing a task
  const startEdit = (task) => {
    if (task.createdBy !== userId && userRole !== "admin") {
      alert("You can only edit your own tasks!");
      return;
    }
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // Update task
  const updateTask = async (task) => {
    if (task.createdBy !== userId && userRole !== "admin") {
      alert("You can only update your own tasks!");
      return;
    }
    try {
      await API.put(`/tasks/${task._id}`, { title: editTitle, description: editDescription });
      setEditingTaskId(null);
      setEditTitle("");
      setEditDescription("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task (admin only)
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <h2>Dashboard</h2>

      <div className="create-task">
        <h3>Create Task</h3>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createTask}>Add Task</button>
      </div>

      <hr />

      <div className="tasks-list">
        <h3>Tasks</h3>
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            {editingTaskId === task._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={() => updateTask(task)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                {(task.createdBy === userId || userRole === "admin") && (
                  <button onClick={() => startEdit(task)}>Edit</button>
                )}
                {userRole === "admin" && (
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}