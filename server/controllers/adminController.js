const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

exports.updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const updateData = { name, email, role };
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }
  const user = await User.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  }).select("-password");
  res.json(user);
};

exports.createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User exists" });

  const hash = await bcrypt.hash(password, 10);
  const admin = await User.create({
    name,
    email,
    password: hash,
    role: "admin",
  });
  res.status(201).json({ message: "Admin created", admin });
};
