const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  updateUser,
  createAdmin,
} = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.use(protect, isAdmin);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.post("/create-admin", createAdmin);

module.exports = router;
