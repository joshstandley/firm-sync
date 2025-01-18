const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Basic validation (ensure all fields are provided)
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user
  const user = await User.create({ email, password, firstName, lastName });

  // Respond with success
  res.status(201).json({
    message: 'User created successfully',
    user: { email: user.email, firstName: user.firstName, lastName: user.lastName }
  });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation (ensure all fields are provided)
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Check if the user exists
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Validate password
  const isValidPassword = await user.validatePassword(password);
  if (!isValidPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.email }, // Payload containing the user's email (this can be extended with other data)
    process.env.JWT_SECRET, // Secret key for signing the token (make sure to add this to .env)
    { expiresIn: '1h' } // Token expires in 1 hour
  );

  // Respond with the token
  res.status(200).json({
    message: 'Login successful',
    token
  });
});

module.exports = router;
