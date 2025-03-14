import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import Subscriber from './models/Subscriber.js';
import crypto from 'crypto';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

// Verify environment variables are loaded
console.log('Environment check:', {
  port: process.env.PORT,
  email: process.env.EMAIL_USER,
  hasPassword: !!process.env.EMAIL_PASS,
  mongoUri: process.env.MONGODB_URI
});

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // limit each IP to 5 requests per windowMs
  message: { error: 'Too many subscription attempts. Please try again later.' }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/subscribe', limiter); // Apply rate limiting to subscription endpoint

// Generate unsubscribe token
const generateUnsubscribeToken = (email) => {
  const secret = process.env.EMAIL_SECRET || 'default-secret-key';
  console.log('Generating token for email:', email); // Debug log
  const token = crypto
    .createHmac('sha256', secret)
    .update(email)
    .digest('hex');
  console.log('Generated token:', token); // Debug log
  return token;
};

// Verify unsubscribe token
const verifyUnsubscribeToken = (email, token) => {
  const expectedToken = generateUnsubscribeToken(email);
  console.log('Token verification:', { 
    email, 
    providedToken: token, 
    expectedToken,
    matches: token === expectedToken 
  }); // Debug log
  return token === expectedToken;
};

// Email template
const createEmailTemplate = (email) => {
  const products =  `${process.env.FRONTEND_URL || 'http://localhost:5173'}/products`;
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
      <h2>Thank you for joining us! 🎉</h2>
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
      <p>To unsubscribe, <a href="${unsubscribeUrl}">click here</a></p>
      <p style="margin-top: 10px;">© 2024 Artisan Wooden Doors. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};

// Email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// Verify email configuration on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error('Email configuration error:', error);
    console.log('Current email settings:', {
      user: process.env.EMAIL_USER,
      passLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0
    });
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Newsletter subscription endpoint
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Received subscription request for:', email);

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('Invalid email format:', email);
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
          platform: req.headers['sec-ch-ua-platform'] || 'unknown'
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    try {
      // Send welcome email
      await transporter.sendMail({
        from: `"Artisan Wooden Doors" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to Artisan Wooden Doors Newsletter! 🎉',
        html: createEmailTemplate(email)
      });
      
      // Update email sent count
      await Subscriber.findByIdAndUpdate(subscriber._id, {
        $inc: { emailsSent: 1 },
        lastEmailSent: new Date()
      });

      console.log('Welcome email sent successfully to:', email);
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      console.error('Email error details:', {
        code: emailError.code,
        command: emailError.command,
        response: emailError.response,
        responseCode: emailError.responseCode,
        stack: emailError.stack
      });
    }

    res.status(201).json({ 
      message: 'Successfully subscribed to newsletter',
      preferences: subscriber.preferences
    });
  } catch (error) {
    console.error('Subscription error:', error);
    console.error('Full error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    res.status(500).json({ 
      error: 'Failed to process subscription. Please try again later.',
      details: error.message
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
      subscriptionDate: subscriber.subscriptionDate
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

// Enhanced unsubscribe endpoint with token verification
app.post('/api/unsubscribe', async (req, res) => {
  try {
    const { email, token } = req.body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Validate token
    if (!token || !verifyUnsubscribeToken(email, token)) {
      return res.status(403).json({ error: 'Invalid or expired unsubscribe token' });
    }

    // First find the subscriber to get existing metadata
    const existingSubscriber = await Subscriber.findOne({ email });
    
    // Find and update subscriber
    const subscriber = await Subscriber.findOneAndUpdate(
      { email },
      { 
        status: 'unsubscribed',
        unsubscribedAt: new Date(),
        metadata: {
          ...(existingSubscriber?.metadata || {}),
          unsubscribeReason: req.body.reason || 'Not specified'
        }
      },
      { new: true }
    );

    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    // Send confirmation email
    try {
      await transporter.sendMail({
        from: `"Artisan Wooden Doors" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Unsubscribe Confirmation',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Unsubscribe Confirmation</h2>
            <p>You have been successfully unsubscribed from our newsletter.</p>
            <p>We're sorry to see you go! If you change your mind, you can always subscribe again from our website.</p>
            <p>Best regards,<br>Artisan Wooden Doors Team</p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Error sending unsubscribe confirmation:', emailError);
    }

    res.json({ 
      message: 'Successfully unsubscribed',
      unsubscribedAt: subscriber.unsubscribedAt
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ error: 'Failed to process unsubscribe request' });
  }
});

// Verify unsubscribe token endpoint
app.get('/api/verify-unsubscribe', async (req, res) => {
  try {
    const { email, token } = req.query;
    
    console.log('Verifying unsubscribe request:', { email, token }); // Debug log
    
    if (!email || !token) {
      console.log('Missing parameters:', { email: !!email, token: !!token }); // Debug log
      return res.status(400).json({ error: 'Missing email or token' });
    }

    const isValid = verifyUnsubscribeToken(email, token);
    console.log('Token validation result:', isValid); // Debug log

    const subscriber = isValid ? await Subscriber.findOne({ email }) : null;
    console.log('Subscriber found:', !!subscriber); // Debug log

    res.json({ 
      isValid,
      email,
      status: subscriber?.status || 'not_found'
    });
  } catch (error) {
    console.error('Verify unsubscribe error:', error);
    res.status(500).json({ error: 'Failed to verify unsubscribe link' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    emailConfig: { 
      user: process.env.EMAIL_USER,
      port: PORT
    },
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the server by visiting: http://localhost:${PORT}/api/health`);
});