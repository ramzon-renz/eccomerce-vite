import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import { google } from 'googleapis';
import Subscriber from './models/Subscriber.js';
import crypto from 'crypto';
import winston from 'winston';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

// Set up logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'combined.log' })],
});

// Server setup
const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection with retry
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => logger.info('MongoDB connected successfully'))
    .catch((err) => {
      logger.error('MongoDB connection failed:', err);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

connectWithRetry();

// OAuth2 configuration for Gmail
// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET, 'https://developers.google.com/oauthplayground');
// oauth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
// const accessToken = await oauth2Client.getAccessToken();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.EMAIL_USER,
//     accessToken: accessToken.token,
//     clientId: process.env.GMAIL_CLIENT_ID,
//     clientSecret: process.env.GMAIL_CLIENT_SECRET,
//     refreshToken: process.env.GMAIL_REFRESH_TOKEN,
//   },
// });

// Email transporter setup with try-catch
let transporter;
try {
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify email configuration on startup
  transporter.verify((error, success) => {
    if (error) {
      logger.error('Email configuration error:', error);
      logger.warn('Current email settings:', {
        user: process.env.EMAIL_USER,
        passLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0,
      });
    } else {
      logger.info('Email server is ready to send messages');
    }
  });

} catch (error) {
  logger.error('Failed to configure email transporter:', error);
}

// Rate limiter configuration
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5,
  message: { error: 'Too many subscription attempts. Please try again later.' },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/subscribe', limiter);

// Generate unsubscribe token
const generateUnsubscribeToken = (email) => {
  const secret = process.env.EMAIL_SECRET || 'default-secret-key';
  const token = crypto
    .createHmac('sha256', secret)
    .update(email)
    .digest('hex');
  
  logger.info(`Generated unsubscribe token for ${email}: ${token}`);
  return token;
};

// Verify unsubscribe token
const verifyUnsubscribeToken = (email, token) => {
  const expectedToken = generateUnsubscribeToken(email);
  const isValid = token === expectedToken;
  
  logger.info(`Verifying unsubscribe token for ${email}. Expected: ${expectedToken}, Provided: ${token}, Valid: ${isValid}`);
  return isValid;
};

const createEmailTemplate = (email, firstName) => {
    const products =  `${process.env.FRONTEND_URL || 'http://localhost:5173'}/products?utm_source=email&utm_medium=welcome&utm_campaign=initial`;
    const unsubscribeToken = generateUnsubscribeToken(email);
    const unsubscribeUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/unsubscribe?email=${encodeURIComponent(email)}&token=${unsubscribeToken}`;

    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #374151;
        background-color: #f3f4f6;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        margin-top: 20px;
        margin-bottom: 20px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: linear-gradient(135deg, #78350f 0%, #92400e 100%);
        color: white;
        padding: 40px 20px;
        text-align: center;
      }
      .header h1 {
        font-size: 28px;
        font-weight: 600;
        margin: 0;
        letter-spacing: -0.5px;
      }
      .content {
        padding: 40px 30px;
        background-color: #fff;
      }
      .content h2 {
        color: #1f2937;
        font-size: 24px;
        margin-bottom: 20px;
        font-weight: 600;
      }
      .content p {
        margin-bottom: 20px;
        color: #4b5563;
        font-size: 16px;
      }
      .features {
        background-color: #f8fafc;
        border-radius: 6px;
        padding: 20px 25px;
        margin: 25px 0;
      }
      .features ul {
        list-style: none;
        padding: 0;
      }
      .features li {
        padding: 10px 0;
        padding-left: 25px;
        position: relative;
        color: #4b5563;
      }
      .features li:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #d97706;
        font-weight: bold;
      }
      .promo-code {
        background-color: #fffbeb;
        border: 1px dashed #d97706;
        border-radius: 6px;
        padding: 15px;
        text-align: center;
        margin: 25px 0;
      }
      .promo-code strong {
        color: #92400e;
        font-size: 18px;
        letter-spacing: 1px;
      }
      .button {
        display: inline-block;
        padding: 14px 30px;
        background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 500;
        margin: 20px 0;
        text-align: center;
        transition: transform 0.2s ease;
      }
      .button:hover {
        transform: translateY(-1px);
      }
      .social-links {
        text-align: center;
        padding: 20px 0;
        border-top: 1px solid #e5e7eb;
        margin-top: 30px;
      }
      .social-links a {
        color: #6b7280;
        text-decoration: none;
        margin: 0 10px;
        font-size: 14px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        color: #6b7280;
        font-size: 13px;
        background-color: #f8fafc;
      }
      .footer a {
        color: #d97706;
        text-decoration: none;
      }
      @media (max-width: 600px) {
        .container {
          margin: 0;
          border-radius: 0;
        }
        .content {
          padding: 30px 20px;
        }
        .header h1 {
          font-size: 24px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to Artisan Wooden Doors</h1>
      </div>
      <div class="content">
        <h2>Hi ${firstName ? firstName : 'there'}, thank you for joining us!</h2>
        <p>We're thrilled to welcome you to our community of design enthusiasts and craftsmanship admirers.</p>
        
        <div class="features">
          <p>As a valued subscriber, you'll receive exclusive updates about:</p>
          <ul>
            <li>New artisan collections and limited editions</li>
            <li>Early access to seasonal sales</li>
            <li>Expert design tips and inspiration</li>
            <li>Behind-the-scenes craftsmanship stories</li>
          </ul>
        </div>
  
        <div class="promo-code">
          <p>Enjoy a special welcome gift</p>
          <strong>WELCOME10</strong>
          <p>for 10% off your first order</p>
        </div>
  
        <div style="text-align: center;">
          <a href="${products}" class="button">
            Explore Our Collection
          </a>
        </div>
  
        <div class="social-links">
          <a href="https://facebook.com/artisanwoodendoors">Facebook</a>
          <a href="https://instagram.com/artisanwoodendoors">Instagram</a>
          <a href="https://pinterest.com/artisanwoodendoors">Pinterest</a>
        </div>
      </div>
      <div class="footer">
        <p>You're receiving this email because you subscribed to our newsletter.</p>
        <p>For support or inquiries, contact us at <a href="mailto:support@artisanwoodendoors.com">support@artisanwoodendoors.com</a>.</p>
        <p>To unsubscribe, <a href="${unsubscribeUrl}">click here</a></p>
        <p style="margin-top: 10px;">© 2024 Artisan Wooden Doors. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>`;
};

// Newsletter subscription endpoint
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Get user agent info
    const userAgent = req.headers['user-agent'] || '';

    // Create or update subscriber
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

    // Send welcome email
    await transporter.sendMail({
      from: `"Artisan Wooden Doors" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Artisan Wooden Doors Newsletter! 🎉',
      html: createEmailTemplate(email),
    });

    // Update email sent count
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
    res.status(500).json({
      error: 'Failed to process subscription. Please try again later.',
      details: error.message,
    });
  }
});

// Get subscriber status
app.get('/api/subscribe/:email', async (req, res) => {
  try {
    const subscriber = await Subscriber.findOne({ email: req.params.email });
    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }
    res.json({
      status: subscriber.status,
      preferences: subscriber.preferences,
      subscriptionDate: subscriber.subscriptionDate,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscriber information' });
  }
});

// Update subscriber preferences
app.patch('/api/subscribe/:email/preferences', async (req, res) => {
  try {
    const subscriber = await Subscriber.findOneAndUpdate(
      { email: req.params.email },
      { $set: { preferences: req.body } },
      { new: true }
    );
    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }
    res.json({ preferences: subscriber.preferences });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// Unsubscribe endpoint
app.post('/api/verify-unsubscribe', async (req, res) => {
  const { email, token, reason } = req.body;  // Accept reason from request

  logger.info(`Received unsubscribe request for email: ${email} with token: ${token}`);

  // Verify the unsubscribe token
  if (!verifyUnsubscribeToken(email, token)) {
    logger.warn(`Invalid unsubscribe token for email: ${email}`); // Log invalid token attempt
    return res.status(400).json({ error: 'Invalid unsubscribe token' });
  }

  try {
    // Check if the subscriber exists before unsubscribing
    const subscriber = await Subscriber.findOne({ email });
    if (!subscriber) {
      logger.warn(`Subscriber not found for email: ${email}`); // Log if subscriber is not found
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    // Update subscriber status to 'unsubscribed' and save the reason
    const updatedSubscriber = await Subscriber.findOneAndUpdate(
      { email },
      { status: 'unsubscribed', unsubscribedAt: new Date(), unsubscribedReason: reason },  // Save reason
      { new: true }
    );

    res.json({ message: 'Successfully unsubscribed', status: updatedSubscriber.status });
  } catch (error) {
    logger.error('Unsubscribe error:', error);
    res.status(500).json({ error: 'Failed to unsubscribe. Please try again later.' });
  }
});

// Verify unsubscribe endpoint
app.get('/api/verify-unsubscribe', async (req, res) => {
  const { email, token } = req.query;

  // Verify the unsubscribe token
  if (!verifyUnsubscribeToken(email, token)) {
    return res.status(400).json({ error: 'Invalid unsubscribe token' });
  }

  try {
    // Find the subscriber
    const subscriber = await Subscriber.findOne({ email });
    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    res.json({ message: 'Unsubscribe token is valid', status: subscriber.status });
  } catch (error) {
    logger.error('Verification error:', error);
    res.status(500).json({ error: 'Failed to verify unsubscribe token. Please try again later.' });
  }
});

// Add this endpoint in your server setup
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    // Validate the input
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // Set up the email transporter (if not already set up)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Send the email
    try {
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_USER, // Your email address
            subject: subject || 'New Contact Form Submission',
            text: `You have a new message from ${name} (${email}, ${phone}):\n\n${message}`,
        });

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

app.post('/api/send-quotation', async (req, res) => {
    const { formData, orderSummary, subtotal } = req.body;

    // Validate the input
    if (!formData.email || !formData.firstName || !formData.lastName) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    const orderDetails = orderSummary.map(item => 
        `${item.name} (Quantity: ${item.quantity}) - $${item.total}`
    ).join('\n');

    const emailContent = `
        <h1>Quotation Request</h1>
        <p>Dear ${formData.firstName} ${formData.lastName},</p>
        <p>Thank you for your quotation request. Here are the details:</p>
        <h2>Order Summary</h2>
        <pre>${orderDetails}</pre>
        <h3>Subtotal: $${subtotal}</h3>
        <p>We will contact you shortly with a detailed quote.</p>
    `;

    try {
        await transporter.sendMail({
            from: `"Artisan Wooden Doors" <${process.env.EMAIL_USER}>`,
            to: formData.email,
            subject: 'Your Quotation Request',
            html: emailContent,
        });

        res.status(200).json({ message: 'Quotation email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send quotation email.' });
    }
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
