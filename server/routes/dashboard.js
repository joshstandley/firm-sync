const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const router = express.Router();

// Protected route
router.get('/dashboard', protect, (req, res) => {
  // Only accessible with a valid token
  res.status(200).json({
    message: 'Welcome to the dashboard',
    user: req.user // This will include the decoded JWT data (e.g., user email)
  });
});

module.exports = router;
