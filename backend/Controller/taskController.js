const Task = require("../models/Task");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get tasks by status
exports.getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tasks = await Task.find({ status }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo, department, dueDate, priority } = req.body;

    if (!title || !assignedTo || !department) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide title, assignedTo, and department" 
      });
    }

    const task = new Task({
      id: `TSK-${Date.now()}`,
      title,
      description,
      status: status || "Pending",
      assignedTo,
      department,
      dueDate,
      priority: priority || "Medium",
      completionRate: 0,
    });

    await task.save();
    res.status(201).json({ success: true, data: task, message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo, department, dueDate, priority, completionRate, notes, reason } = req.body;

    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (assignedTo) task.assignedTo = assignedTo;
    if (department) task.department = department;
    if (dueDate) task.dueDate = dueDate;
    if (priority) task.priority = priority;
    if (completionRate !== undefined) task.completionRate = completionRate;
    if (notes) task.notes = notes;
    if (reason) task.reason = reason;

    task.updatedAt = Date.now();
    await task.save();

    res.status(200).json({ success: true, data: task, message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get task statistics
exports.getTaskStats = async (req, res) => {
  try {
    const completed = await Task.countDocuments({ status: "Completed" });
    const incomplete = await Task.countDocuments({ status: "Incomplete" });
    const pending = await Task.countDocuments({ status: "Pending" });
    const inProgress = await Task.countDocuments({ status: "In Progress" });
    const total = completed + incomplete + pending + inProgress;

    res.status(200).json({
      success: true,
      data: {
        completed,
        incomplete,
        pending,
        inProgress,
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
