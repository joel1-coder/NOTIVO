const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["Completed", "Incomplete", "Pending", "In Progress"], default: "Pending" },
    assignedTo: { type: String }, // User name or email
    department: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
    completionRate: { type: Number, default: 0, min: 0, max: 100 },
    notes: { type: String },
    reason: { type: String }, // For incomplete tasks
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
