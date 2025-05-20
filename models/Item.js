const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true }, // file path
  model: { type: String, required: true }, // file path
});

module.exports = mongoose.model('Item', itemSchema);
