import express from 'express';
import { templateManager } from '../utils/emailTemplateManager.js';
import { transporter } from '../utils/emailTransporter.js';
import { logger } from '../utils/logger.js';
import { quotationValidator, validateRequest } from '../middleware/validation.js';

const router = express.Router();

router.post('/',
  quotationValidator,
  validateRequest,
  async (req, res, next) => {
    try {
      const { formData, orderSummary, subtotal } = req.body;

      const emailContent = await templateManager.render('quotation', {
        formData,
        orderSummary,
        subtotal
      });

      await transporter.sendMail({
        from: `"Artisan Wooden Doors" <${process.env.EMAIL_USER}>`,
        to: formData.email,
        subject: 'Your Quotation Request - Artisan Wooden Doors',
        html: emailContent
      });

      res.status(200).json({
        message: 'Quotation request sent successfully'
      });
    } catch (error) {
      logger.error('Error sending quotation:', error);
      next(new AppError('Failed to process quotation request', 500));
    }
  }
);

export default router;