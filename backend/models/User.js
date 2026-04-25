const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    staffId: { type: String, required: true, unique: true },
    dob: { type: Date },
    department: { type: String, required: true },
    role: { type: String, enum: ["Admin", "HOD", "Staff"], default: "Staff" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    avatarBg: { type: String, default: "#2563EB" },
    initials: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
