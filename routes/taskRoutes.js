const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/tasks - Create a new task
router.post("/", auth, async (req, res) => {
  const { title, description, priority } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      priority,
      userId: req.user, // Get the userId from the auth middleware
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tasks - Get all tasks for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const task = await Task.find({ userId: req.user });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/tasks/:id - Update a task (mark as complete/incomplete)
router.put("/:id", auth, async (req, res) => {
  const { title, description, status, priority } = req.body;

  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
