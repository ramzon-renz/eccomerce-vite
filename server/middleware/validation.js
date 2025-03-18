import { body, validationResult } from 'express-validator';
import xss from 'xss';

// Sanitize and validate email
export const emailValidator = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape()
    .withMessage('Invalid email address'),
];

// Sanitize and validate contact form
export const contactFormValidator = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .escape()
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape()
    .withMessage('Invalid email address'),
  body('phone')
    .optional()
    .trim()
    .isLength({ min: 10, max: 15 })
    .escape()
    .withMessage('Phone number must be between 10 and 15 characters'),
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .escape()
    .withMessage('Subject must be less than 100 characters'),
  body('message')
    .trim()
    .isLength({ min: 10 })
    .escape()
    .withMessage('Message must be at least 10 characters long'),
];

// Sanitize and validate quotation request
export const quotationValidator = [
  body('formData.email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape()
    .withMessage('Invalid email address'),
  body('formData.firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .escape()
    .withMessage('First name must be between 2 and 50 characters'),
  body('formData.lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .escape()
    .withMessage('Last name must be between 2 and 50 characters'),
  body('orderSummary')
    .isArray()
    .withMessage('Order summary must be an array'),
  body('orderSummary.*.name')
    .trim()
    .notEmpty()
    .customSanitizer(value => xss(value))
    .withMessage('Order item name cannot be empty'),
  body('subtotal')
    .isNumeric()
    .toFloat()
    .withMessage('Subtotal must be a number'),
];

// Middleware to validate request
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};