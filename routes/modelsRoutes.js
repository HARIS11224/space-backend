const express = require("express");
const Model = require("../models/Models");

const router = express.Router();

// Fetch all models
router.get("/models", async (req, res) => {
  try {
    const models = await Model.find(); // Fetch all data from the collection
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch models by category
router.get("/models/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const models = await Model.find({ category }); // Fetch models by category
    if (models.length === 0) {
      return res.status(404).json({ message: "No models found in this category" });
    }
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch a model by ID
router.get("/models/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const model = await Model.findById(id); // Fetch a specific model by its ID
    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
