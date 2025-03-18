import { transporter } from '../utils/emailTransporter.js';
import { logger } from '../utils/logger.js';

export const emailConfig = {
  init: () => {
    transporter.verify((error) => {
      if (error) {
        logger.error('Email transporter error:', error);
      } else {
        logger.info('Email server is ready to send messages');
      }
    });
  }
};