const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // ✅ add this
const authRoutes = require('./routes/authRoutes');
const modelRoutes = require('./routes/modelsRoutes');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const contactRoutes = require('./routes/contact');
const path = require("path");
const texturesRoute = require('./routes/textures');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // ✅ use env if available

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Static folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/Decor', express.static(path.join(__dirname, 'Decor')));
app.use('/api/textures', texturesRoute);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/models', modelRoutes);
app.use('/api', itemRoutes);
app.use('/api', contactRoutes);

// ✅ Admin Login Route
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// ✅ Protected Route Example
app.get('/api/admin/protected', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.json({ message: 'Authorized', user: decoded });
  } catch {
    return res.sendStatus(403);
  }
});

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
