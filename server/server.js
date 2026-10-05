import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Route imports
import assetRoutes from './routes/assetRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import workerRoutes from './routes/workerRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    system: 'UrbanQR Backend Engine',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/assets', assetRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/users', userRoutes);

// Root greeting
app.get('/', (req, res) => {
  res.send('UrbanQR — Smart Urban Asset Management & Citizen Reporting API is running.');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[UrbanQR Server]: Active on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
