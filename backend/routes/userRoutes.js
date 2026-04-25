const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  deactivateUser,
  activateUser,
} = require("../Controller/userController");
const { protect } = require("../middleware/authmidddleware");

// Protected routes
router.get("/", protect, getAllUsers);
router.get("/:id", protect, getUser);
router.post("/", protect, createUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
router.patch("/:id/deactivate", protect, deactivateUser);
router.patch("/:id/activate", protect, activateUser);

module.exports = router;
