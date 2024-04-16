// backend/routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get the first user
router.get('/', async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
