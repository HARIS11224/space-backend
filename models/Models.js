const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  file: { type: String, required: true }, // Path or URL to the file
  description: { type: String, required: false }, // Optional description of the model
});

module.exports = mongoose.model("Model", modelSchema);
