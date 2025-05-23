const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

// Configure Multer for profile image uploads
const uploadsDir = path.join(__dirname, '../uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });

router.get('/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    console.log('User count:', count);  // <-- Add this line to log count
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile (with optional profile image)
router.put('/:id', upload.single('profileImage'), async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      const relativePath = `uploads/${req.file.filename}`; // Always use forward slashes
      const fullUrl = `${req.protocol}://${req.get('host')}/${relativePath}`;
      updates.profileImage = fullUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select('-password');

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
