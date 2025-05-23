const express = require('express');
const multer = require('multer');
const path = require('path');
const Texture = require('../models/Texture');

const router = express.Router();

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/textures');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.get('/count', async (req, res) => {
  try {
    const count = await Texture.countDocuments();
    console.log('Textures count:', count); // for debugging
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/textures - Fetch all textures
router.get('/', async (req, res) => {
  try {
    const textures = await Texture.find().sort({ uploadDate: -1 });
    res.json(textures);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch textures' });
  }
});

// POST /api/textures - Upload a new texture
router.post('/', upload.single('preview'), async (req, res) => {
  try {
    const { name, type, tags } = req.body;
    const preview = req.file ? `/uploads/textures/${req.file.filename}` : '';

    const newTexture = new Texture({
      name,
      type,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      preview
    });

    await newTexture.save();
    res.status(201).json(newTexture);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload texture' });
  }
});

module.exports = router;
