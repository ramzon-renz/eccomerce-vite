import express from 'express';
import { subscriptionLimiter } from '../middleware/rateLimiter.js';
import { emailValidator, validateRequest } from '../middleware/validation.js';
import { templateManager } from '../utils/emailTemplateManager.js';
import { transporter } from '../utils/emailTransporter.js';
import { generateUnsubscribeToken } from '../utils/tokenUtils.js';
import Subscriber from '../models/Subscriber.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

router.post('/',
  subscriptionLimiter,
  emailValidator,
  validateRequest,
  async (req, res, next) => {
    try {
      const { email, firstName } = req.body;

      const userAgent = req.headers['user-agent'] || '';

      const subscriber = await Subscriber.findOneAndUpdate(
        { email },
        {
          email,
          status: 'active',
          metadata: {
            source: 'website',
            browser: userAgent,
            platform: req.headers['sec-ch-ua-platform'] || 'unknown',
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      const welcomeEmail = await templateManager.render('welcome', {
        email,
        firstName,
        products: `${process.env.FRONTEND_URL}/products?utm_source=email&utm_medium=welcome`,
        unsubscribeUrl: `${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(email)}&token=${generateUnsubscribeToken(email)}`
      });

      await transporter.sendMail({
        from: `"Artisan Wooden Doors" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to Artisan Wooden Doors Newsletter! 🎉',
        html: welcomeEmail,
      });

      await Subscriber.findByIdAndUpdate(subscriber._id, {
        $inc: { emailsSent: 1 },
        lastEmailSent: new Date(),
      });

      res.status(201).json({
        message: 'Successfully subscribed to newsletter',
        preferences: subscriber.preferences,
      });
    } catch (error) {
      logger.error('Subscription error:', error);
      next(new AppError('Failed to process subscription', 500));
    }
  }
);

export default router;