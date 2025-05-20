const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  role: { type: String, enum: ['Designer', 'Client', 'Architect'], default: 'Client' },
  profileImage: { type: String }, // Base64 or image URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
