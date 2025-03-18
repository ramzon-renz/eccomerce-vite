import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { logger } from './logger.js';

dotenv.config();

// Set up the email transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify the transporter connection
transporter.verify((error) => {
  if (error) {
    logger.error('Email transporter error:', error);
  } else {
    logger.info('Email server is ready to send messages');
  }
});