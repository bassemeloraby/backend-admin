const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // data from frontend
  const { name, email, password } = req.body;
  // check if all fields are added
  if (!name || !email || !password) {
    res.status(400).json({ message: 'Please add all fields' });
  }
  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })
// Check for user data validation
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // data from frontend
  const { email, password } = req.body;
  // Check for user email
  const user = await User.findOne({ email })
// Check for user password and return user data
  if (user && (await bcrypt.compare(password, user.password))) {
    // return user data
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'me user' });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
