const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { auth, checkRole } = require('../middleware/auth.middleware');

// Get all users (admin only)
router.get('/', auth, checkRole(['admin']), async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

module.exports = router; 