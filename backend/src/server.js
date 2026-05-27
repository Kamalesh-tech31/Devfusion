require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const deliveryRoutes = require('./routes/deliveries');
const locationRoutes = require('./routes/locations');

const app = express();
const PORT = Number(process.env.PORT || 4000);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// Health check (before DB connection)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', database: 'MongoDB' });
});

// API Routes
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/location-updates', locationRoutes);

// Error handling middleware
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Devfusion backend listening on port ${PORT}`);
      console.log(`Frontend URL: ${FRONTEND_URL}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
