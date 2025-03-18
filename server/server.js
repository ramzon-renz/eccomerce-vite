import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/database.js';
import { securityConfig } from './config/security.js';
import { emailConfig } from './config/email.js';
import { errorHandler } from './middleware/errorHandler.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import contactRoutes from './routes/contact.js';
import quotationRoutes from './routes/quotation.js';
import unsubscribeRoutes from './routes/unsubscribe.js';
import { logger } from './utils/logger.js';
import { checkEnvironment } from './config/checkEnv.js';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

// Check environment variables before starting
checkEnvironment();

// Server setup
const app = express();
const PORT = process.env.PORT || 5001;

// Initialize configs
connectDB();
emailConfig.init();

// Global middleware
app.use(securityConfig.initialize());
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/subscribe', subscriberRoutes); 
app.use('/api/contact', contactRoutes);
app.use('/api/send-quotation', quotationRoutes);
app.use('/api/verify-unsubscribe', unsubscribeRoutes);

// Error handling
app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      logger.info('MongoDB connection closed.');
      process.exit(0);
    });
  });
});
