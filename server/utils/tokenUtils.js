import { createHmac, randomBytes } from 'crypto';
import { logger } from './logger.js';

export const generateUnsubscribeToken = (email) => {
  try {
    if (typeof email !== 'string') {
      throw new TypeError('Email must be a string');
    }

    const secret = process.env.EMAIL_SECRET || 'default-secret-key';
    const token = createHmac('sha256', secret)
      .update(String(email))
      .digest('hex');
    
    logger.info(`Generated token for email: ${email}`);
    return token;
  } catch (error) {
    logger.error('Token generation error:', error);
    throw error;
  }
};

export const verifyUnsubscribeToken = (email, token) => {
  try {
    const expectedToken = generateUnsubscribeToken(email);
    return token === expectedToken;
  } catch (error) {
    logger.error('Token verification error:', error);
    return false;
  }
};