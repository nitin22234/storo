const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔄 Attempting to connect to MongoDB...');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully to Atlas!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// Routes
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const supportRoutes = require('./routes/supportRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/admin', adminRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'Storo API is running',
    mongoStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
