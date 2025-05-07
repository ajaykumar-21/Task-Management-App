const express = require("express");
const User = require("../models/User");

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Step 1: Received request", req.body);
    const existingUser = await User.findOne({ email });
    console.log("Step 2: existingUser", existingUser);
    if (existingUser) {
      console.log("Step 3: User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ email, password });
    console.log("Step 4: New user created", newUser);
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Step 5: Error caught", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
