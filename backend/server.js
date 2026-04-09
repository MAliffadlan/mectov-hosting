const express = require('express');
const cors = require('cors');
const path = require('path');

// Route imports
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const serverRoutes = require('./routes/serverRoutes');

// Middleware imports
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Global Middleware ---
app.use(cors());
app.use(express.json());

// --- Request Logger (dev) ---
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// --- Routes ---

// Public routes (no auth required)
app.use('/api', authRoutes);

// Protected routes (JWT required)
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/server', authMiddleware, serverRoutes);

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`\n🚀 Mectov Hosting Panel API`);
  console.log(`   Running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
