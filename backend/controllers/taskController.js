const Task = require("../models/Task"); 
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }
  try {
    const task = await Task.create({
      title,
      description,
      createdBy: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    console.error("Create Task Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getTasks = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    let tasks;
    if (req.user.role === "admin") {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ createdBy: req.user.id });
    }

    res.json(tasks);
  } catch (err) {
    console.error("Get Tasks Error:", err); 
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error("Update Task Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};



exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin") 
      return res.status(403).json({ message: "Access denied" });

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Delete Task Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};