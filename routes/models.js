const express = require("express");
const Model = require("../models/Model");

const router = express.Router();

// Route to add a new model
router.post("/add", async (req, res) => {
  const { name, category, file, description } = req.body;

  try {
    if (!name || !category || !file) {
      return res.status(400).json({ message: "Name, category, and file are required" });
    }

    const newModel = new Model({ name, category, file, description });
    await newModel.save();
    res.status(201).json({ message: "Model added successfully", model: newModel });
  } catch (error) {
    console.error("Error adding model:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to get all models
router.get("/", async (req, res) => {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to get models by category
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const models = await Model.find({ category });
    if (models.length === 0) {
      return res.status(404).json({ message: `No models found in category: ${category}` });
    }
    res.json(models);
  } catch (error) {
    console.error("Error fetching models by category:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to get a single model by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const model = await Model.findById(id);
    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.json(model);
  } catch (error) {
    console.error("Error fetching model by ID:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to update a model
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, file, description } = req.body;

  try {
    const updatedModel = await Model.findByIdAndUpdate(
      id,
      { name, category, file, description },
      { new: true, runValidators: true }
    );

    if (!updatedModel) {
      return res.status(404).json({ message: "Model not found" });
    }

    res.json({ message: "Model updated successfully", model: updatedModel });
  } catch (error) {
    console.error("Error updating model:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to delete a model
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedModel = await Model.findByIdAndDelete(id);

    if (!deletedModel) {
      return res.status(404).json({ message: "Model not found" });
    }

    res.json({ message: "Model deleted successfully", model: deletedModel });
  } catch (error) {
    console.error("Error deleting model:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
