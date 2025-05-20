const mongoose = require('mongoose');

const textureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Wall', 'Floor'], required: true },
  tags: [String],
  preview: { type: String, required: true }, // image URL or file path
  uploadDate: { type: Date, default: Date.now },
  downloads: { type: Number, default: 0 },
});

module.exports = mongoose.model('Texture', textureSchema);
