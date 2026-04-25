const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTasksByStatus,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../Controller/taskController");
const { protect } = require("../middleware/authmidddleware");

// Protected routes
router.get("/", protect, getAllTasks);
router.get("/stats", protect, getTaskStats);
router.get("/status/:status", protect, getTasksByStatus);
router.get("/:id", protect, getTask);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
