const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const SECRET = "supersecretkey";

router.post("/register", async (req, res) => {

  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword
  });

  await user.save();

  res.send("User registered");
});

router.post("/login", async (req, res) => {

  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).send("User not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).send("Invalid password");
  }

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });

  res.json({ token });
});

module.exports = router;
