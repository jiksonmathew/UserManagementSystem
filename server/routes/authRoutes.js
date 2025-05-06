const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getDashboard,
  getCurrentUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/dashboard", protect, getDashboard);
router.get("/me", getCurrentUser);

module.exports = router;
