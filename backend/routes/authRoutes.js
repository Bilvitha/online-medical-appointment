import express from "express";
import bcrypt from "bcryptjs"; // ✅ Consistent hashing library
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

console.log("🔒 Using bcryptjs for auth routes");

// ✅ Signup Route (No manual hashing)
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ❌ Removed manual hashing — handled by User.js pre-save hook
    const user = new User({
      email: email.trim(),
      password: password.trim(),
    });

    await user.save();

    console.log("🟢 Signup email:", email);
    console.log("🟢 Password hashed automatically by User model pre-save hook");

    res.status(201).json({ message: "Account created successfully!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// ✅ Login Route (Checks password correctly)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("🔵 Login email:", email);
    console.log("----- LOGIN DEBUG START -----");
    console.log("Entered password:", `"${password}"`);
    console.log("Stored hash:", `"${user.password}"`);
    console.log("bcrypt library: bcryptjs");
    console.log("----- LOGIN DEBUG END -----");

    // ✅ Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    console.log("🧩 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "defaultSecret",
      { expiresIn: "1h" }
    );

    console.log("✅ Login success for:", email);

    res.status(200).json({
      message: "Login successful!",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;
