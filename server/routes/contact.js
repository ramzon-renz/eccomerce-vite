import express from 'express';
import { contactFormLimiter } from '../middleware/rateLimiter.js';
import { contactFormValidator, validateRequest } from '../middleware/validation.js';
import { transporter } from '../utils/emailTransporter.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

router.post('/',
  contactFormLimiter,
  contactFormValidator,
  validateRequest,
  async (req, res, next) => {
    const { name, email, phone, subject, message } = req.body;

    try {
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: subject || 'New Contact Form Submission',
        text: `You have a new message from ${name} (${email}, ${phone}):\n\n${message}`,
      });

      res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      logger.error('Error sending email:', error);
      next(new AppError('Failed to send message', 500));
    }
  }
);

export default router;