const User = require("../models/User");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const { name, email, staffId, dob, department, role } = req.body;

    // Validate required fields
    if (!name || !email || !staffId || !department) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide all required fields" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { staffId }] });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User with this email or staff ID already exists" 
      });
    }

    // Generate initials
    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const colors = ["#2563EB", "#8B5CF6", "#F97316", "#10B981", "#EF4444", "#06B6D4", "#F59E0B"];
    const avatarBg = colors[Math.floor(Math.random() * colors.length)];

    const user = new User({
      id: `USR-${Date.now()}`,
      name,
      email,
      staffId,
      dob,
      department,
      role: role || "Staff",
      initials,
      avatarBg,
      status: "Active",
    });

    await user.save();
    res.status(201).json({ success: true, data: user, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, staffId, dob, department, role, status } = req.body;

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (staffId) user.staffId = staffId;
    if (dob) user.dob = dob;
    if (department) user.department = department;
    if (role) user.role = role;
    if (status) user.status = status;
    if (name) {
      user.initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }

    user.updatedAt = Date.now();
    await user.save();

    res.status(200).json({ success: true, data: user, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Deactivate user
exports.deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.status = "Inactive";
    user.updatedAt = Date.now();
    await user.save();
    res.status(200).json({ success: true, data: user, message: "User deactivated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Activate user
exports.activateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.status = "Active";
    user.updatedAt = Date.now();
    await user.save();
    res.status(200).json({ success: true, data: user, message: "User activated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
