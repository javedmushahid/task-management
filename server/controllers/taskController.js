const Task = require("../models/Task");

exports.addTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      status,
      userId: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;
    const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndDelete(taskId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
