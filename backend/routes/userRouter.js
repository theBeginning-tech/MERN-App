import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password_hash: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User Created" });
  } catch (err) {
    res.status(400).json({ error: "Signup failed: Email likely exists" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password_hash))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "10s",
    });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// GET /api/auth/me
router.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password_hash");
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

// GET /api/auth/data
router.get("/data", verifyToken, (req, res) => {
  res.status(200).json({
    payload: [
      "Confidential Data 1",
      "Confidential Data 2",
      "Confidential Data 3",
    ],
  });
});

export default router;
