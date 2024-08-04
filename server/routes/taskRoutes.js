const express = require("express");
const router = express.Router();
const {
  addTask,
  editTask,
  deleteTask,
  getTasks,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/tasks", authMiddleware, addTask);
router.put("/tasks/:taskId", authMiddleware, editTask);
router.delete("/tasks/:taskId", authMiddleware, deleteTask);
router.get("/tasks", authMiddleware, getTasks);

module.exports = router;
