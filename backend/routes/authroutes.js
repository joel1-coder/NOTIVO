const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getMe,
} = require("../Controller/authController");
const { protect } = require("../middleware/authmidddleware");

router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getMe);

module.exports = router;