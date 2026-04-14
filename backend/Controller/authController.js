const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Login admin
// @route   POST /api/auth/login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Please fill in all fields" });

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Forgot password — send OTP
// @route   POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(404).json({ message: "No account found with that email" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    admin.otp = otp;
    admin.otpExpiry = otpExpiry;
    await admin.save();

    await sendEmail({
      to: email,
      subject: "Admin Portal — Your OTP Code",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="color:#1e3a5f;margin-bottom:8px;">Password Reset OTP</h2>
          <p style="color:#6b7280;">Use the OTP below to reset your password. It expires in <strong>10 minutes</strong>.</p>
          <div style="font-size:36px;font-weight:700;letter-spacing:12px;color:#1e3a5f;text-align:center;padding:24px 0;">${otp}</div>
          <p style="color:#9ca3af;font-size:13px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (admin.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (admin.otpExpiry < Date.now())
      return res.status(400).json({ message: "OTP has expired. Please request again." });

    admin.otp = undefined;
    admin.otpExpiry = undefined;
    await admin.save();

    // Issue a short-lived reset token
    const resetToken = jwt.sign({ id: admin._id, purpose: "reset" }, process.env.JWT_SECRET, { expiresIn: "15m" });

    res.json({ success: true, resetToken });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
const resetPassword = async (req, res) => {
  const { resetToken, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    if (decoded.purpose !== "reset")
      return res.status(400).json({ message: "Invalid reset token" });

    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.password = password;
    await admin.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.status(400).json({ message: "Reset session expired. Please start again." });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginAdmin, forgotPassword, verifyOtp, resetPassword, getMe };