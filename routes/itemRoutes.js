const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const Item = require('../models/Item');

// --- Create upload folders if not exist ---
const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isModel = file.fieldname === 'model';
    const folder = isModel ? 'uploads/models' : 'uploads/images';
    const fullPath = path.join(__dirname, '..', folder);
    ensureFolderExists(fullPath);
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });


router.get('/items/count', async (req, res) => {
  const count = await Item.countDocuments();
  res.json({ count });
})

// --- GET all items ---
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- POST a new item (with file uploads) ---
router.post(
  '/items',
  upload.fields([
    { name: 'model', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { name, type } = req.body;

      if (!name || !type || !req.files?.model || !req.files?.image) {
        return res.status(400).json({ error: 'Missing required fields or files' });
      }

      const modelPath = `uploads/models/${req.files.model[0].filename}`;
      const imagePath = `uploads/images/${req.files.image[0].filename}`;

      const newItem = new Item({
        name,
        type,
        model: modelPath,
        image: imagePath,
      });

      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// --- DELETE an item by ID ---
router.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: 'Item not found' });

    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
