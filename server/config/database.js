import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const connectDB = () => {
  const connectWithRetry = () => {
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => logger.info('MongoDB connected successfully'))
      .catch((err) => {
        logger.error('MongoDB connection failed:', err);
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
      });
  };

  connectWithRetry();
};