// controllers/auth.js
import User from "../models/user.js";
import { hashPassword, compare_hashed_passwords } from "../utils/hashing.js";

import {createToken } from "../utils/tokens.js";

export async function register(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "username and password required" });

    const found = await User.findOne({ username });
    if (found) return res.status(409).json({ message: "User already registered" });

    const hashed = await hashPassword(password);
    const user = await User.create({ username, password: hashed });
    return res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "username and password required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const ok = await compare_hashed_passwords(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid Credentials" });

    const token = createToken(user._id.toString(), username);
    return res.json({ message: "User logged in", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


