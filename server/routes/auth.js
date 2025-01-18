const express = require('express');
const User = require('../models/User');
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

module.exports = router;
