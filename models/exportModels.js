require("dotenv").config();
const mongoose = require("mongoose");

// Define the schema
const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  file: { type: String, required: true },
  description: { type: String, required: true }
});

const Model = mongoose.model("Model", modelSchema);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/spacesketch";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// JSON Data
const modelsData = [
    {
      "category": "almira",
      "models": [
        { "name": "Almirah", "file": "Decor/Decor/almira/almirah.glb", "description": "A modern almirah with a wooden finish." },
        { "name": "Almirah Variant", "file": "Decor/Decor/almira/almirah (1).glb", "description": "A sleek and compact almirah suitable for minimalist interiors." },
        { "name": "Room Almirah", "file": "Decor/Decor/almira/almirah_for_a_room.glb", "description": "An almirah designed to fit perfectly in a room." },
        { "name": "Game Model Almirah", "file": "Decor/Decor/almira/game_model_of_almira.glb", "description": "A game-ready almirah with optimized details." },
        { "name": "Shelf", "file": "Decor/Decor/almira/shelf.glb", "description": "A compact shelf that matches various designs." },
        { "name": "Wardrobe with Glass Panel", "file": "Decor/Decor/almira/wardrobe_with_glass_panel_and_open_shelf.glb", "description": "A modern wardrobe with glass panels and open shelves." },
        { "name": "Wooden Almirah", "file": "Decor/Decor/almira/wooden_almirah.glb", "description": "A wooden almirah with a vintage finish." },
        { "name": "Window Wooden Almirah", "file": "Decor/Decor/almira/window_wooden_4_mb.glb", "description": "A unique almirah design incorporating wooden window frames." },
        { "name": "Dual Shelf Almirah", "file": "Decor/Decor/almira/dual_shelf_almirah.glb", "description": "A dual shelf almirah for enhanced storage." },
        { "name": "Compact Almirah", "file": "Decor/Decor/almira/compact_almirah.glb", "description": "A compact almirah perfect for smaller spaces." }
      ]
    },
    {
      "category": "beds",
      "models": [
        { "name": "Standard Bed", "file": "Decor/Decor/beds/bed (1).glb", "description": "A simple and elegant standard bed." },
        { "name": "King Bed", "file": "Decor/Decor/beds/bed (2).glb", "description": "A luxurious king-sized bed." },
        { "name": "Bed with Bedside Table", "file": "Decor/Decor/beds/bed_bedside_table.glb", "description": "A bed complemented with a bedside table." },
        { "name": "Briona Bed", "file": "Decor/Decor/beds/bed_briona.glb", "description": "A high-end Briona bed for stylish interiors." },
        { "name": "Cubes Bed", "file": "Decor/Decor/beds/cubes_bed.glb", "description": "A cube-styled modern bed." },
        { "name": "Messy Bed", "file": "Decor/Decor/beds/messy_bed_2.0_with_wall_mounted_backboard.glb", "description": "A messy bed with a wall-mounted backboard for realistic design." },
        { "name": "Old Bed", "file": "Decor/Decor/beds/old_bed.glb", "description": "A traditional bed design with a rustic touch." },
        { "name": "King Floor Bed", "file": "Decor/Decor/beds/king_floor_bed.glb", "description": "A low king-size floor bed." },
        { "name": "Bunk Bed", "file": "Decor/Decor/beds/bunk_bed.glb", "description": "A space-saving bunk bed design." },
        { "name": "Modern Bed", "file": "Decor/Decor/beds/modern_bed.glb", "description": "A sleek and modern bed for contemporary interiors." }
      ]
    },
    {
      "category": "dressing tables",
      "models": [
        { "name": "Alana Dressing Table", "file": "Decor/Decor/dressing tables/alana_dressing_table_black.glb", "description": "A black dressing table with modern aesthetics." },
        { "name": "Chinese Console Table", "file": "Decor/Decor/dressing tables/chinese_lacquer_shanxi_console_table.glb", "description": "A dressing table with traditional Chinese lacquer design." },
        { "name": "Furniture Dressing Table", "file": "Decor/Decor/dressing tables/coiffeuse_furniture_dressing_table.glb", "description": "A furniture dressing table with coiffeuse style." },
        { "name": "Basic Dressing Table", "file": "Decor/Decor/dressing tables/dressing_table (1).glb", "description": "A simple dressing table suitable for any room." },
        { "name": "Compact Dressing Table", "file": "Decor/Decor/dressing tables/dressing_table (2).glb", "description": "A compact dressing table for small spaces." },
        { "name": "Dressing Table with Mirror", "file": "Decor/Decor/dressing tables/dressing_table_with_mirror.glb", "description": "A dressing table with a large attached mirror." },
        { "name": "Classic Dressing Table", "file": "Decor/Decor/dressing tables/classic_dressing_table.glb", "description": "A classic dressing table for timeless interiors." },
        { "name": "Glass Top Dressing Table", "file": "Decor/Decor/dressing tables/glass_top_dressing_table.glb", "description": "A dressing table with a glass top for a modern touch." },
        { "name": "Vintage Dressing Table", "file": "Decor/Decor/dressing tables/vintage_dressing_table.glb", "description": "A vintage-styled dressing table with ornate details." },
        { "name": "Luxury Dressing Table", "file": "Decor/Decor/dressing tables/luxury_dressing_table.glb", "description": "A luxurious dressing table for premium interiors." }
      ]
    },
    {
      "category": "side tables",
      "models": [
        { "name": "Amalfi Side Table", "file": "Decor/Decor/side tables/amalfi_side_table_rd_510.glb", "description": "A side table with Amalfi design." },
        { "name": "American Side Table", "file": "Decor/Decor/side tables/american_side_table.glb", "description": "A sturdy American-style side table." },
        { "name": "Glass Side Table", "file": "Decor/Decor/side tables/side_table_tall_01_4k.glb", "description": "A tall side table with intricate details." },
        { "name": "Wooden Side Table", "file": "Decor/Decor/side tables/wooden_side_table.glb", "description": "A wooden side table with a natural finish." },
        { "name": "Contemporary Side Table", "file": "Decor/Decor/side tables/contemporary_side_table.glb", "description": "A contemporary side table for modern spaces." },
        { "name": "Minimalist Side Table", "file": "Decor/Decor/side tables/minimalist_side_table.glb", "description": "A minimalist design side table." },
        { "name": "Round Side Table", "file": "Decor/Decor/side tables/round_side_table.glb", "description": "A round side table with clean lines." },
        { "name": "Metal Side Table", "file": "Decor/Decor/side tables/metal_side_table.glb", "description": "A metal side table with industrial appeal." },
        { "name": "Glass and Metal Side Table", "file": "Decor/Decor/side tables/glass_metal_side_table.glb", "description": "A glass and metal combination side table." },
        { "name": "Classic Side Table", "file": "Decor/Decor/side tables/classic_side_table.glb", "description": "A classic side table for versatile use." }
      ]
    }
  ]
  ;

// Function to import data
const importModels = async () => {
  try {
    for (const category of modelsData) {
      for (const model of category.models) {
        const newModel = new Model({
          name: model.name,
          category: category.category,
          file: model.file,
          description: model.description
        });
        await newModel.save();
      }
    }
    console.log("All models imported successfully!");
    process.exit();
  } catch (error) {
    console.error("Error importing models:", error);
    process.exit(1);
  }
};

// Call the import function
importModels();
