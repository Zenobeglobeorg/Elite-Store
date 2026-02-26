const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const buyerRoutes = require('./routes/buyer.routes');
const sellerRoutes = require('./routes/seller.routes');

const app = express();

// CORS : en production autoriser le frontend (Vercel). En dev, tout autoriser.
const corsOptions = {
  origin: process.env.FRONTEND_URL || process.env.CORS_ORIGIN || true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);

app.get('/', (req, res) => {
  res.send('Elite Store API is running');
});

module.exports = app;
