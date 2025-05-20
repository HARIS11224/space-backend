const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const modelRoutes = require('./routes/modelsRoutes');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const path = require("path");
const texturesRoute = require('./routes/textures');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());

// Increased body parser size limit for base64 files
app.use(express.json({ limit: '100mb' })); // ⬅️ Set it higher to be safe
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
// Static folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/Decor', express.static(path.join(__dirname, 'Decor')));
app.use('/api/textures', texturesRoute);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/models', modelRoutes);
app.use('/api', itemRoutes); // better to mount on /api/items to be RESTful

// Route logging utility
app.on('listening', () => {
  const host = `http://localhost:${PORT}`;
  console.log('Registered API Routes:');

  const logRoutes = (prefix, router) => {
    router.stack.forEach(layer => {
      if (layer.route && layer.route.path) {
        console.log(`${host}${prefix}${layer.route.path}`);
      }
    });
  };

  logRoutes('/api/auth', authRoutes);
  logRoutes('/api/users', userRoutes);
  logRoutes('/api/models', modelRoutes);
  logRoutes('/api', itemRoutes);
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  app.emit('listening');
});
