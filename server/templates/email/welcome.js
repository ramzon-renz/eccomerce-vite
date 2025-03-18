import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadStyles } from '../../utils/styleLoader.js';
import { generateUnsubscribeToken } from '../../utils/tokenUtils.js';
import { logger } from '../../utils/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const welcomeTemplate = async ({ email, firstName = 'there', options = {} }) => {
  try {
    if (!email) throw new Error('Email is required');

    // Load global styles
    let styles = '';
    try {
      styles = await loadStyles('global.css');
      logger.info('Global styles loaded successfully');
    } catch (error) {
      logger.warn('Failed to load global styles, using fallback:', error);
      styles = ''; // No fallback styles needed as we are using global.css
    }

    const products = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/products?utm_source=email&utm_medium=welcome`;
    const unsubscribeToken = generateUnsubscribeToken(String(email));
    const unsubscribeUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/unsubscribe?email=${encodeURIComponent(email)}&token=${unsubscribeToken}`;

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${styles}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${process.env.FRONTEND_URL}/images/logo.png" alt="Artisan Wooden Doors" class="logo">
            <h1>Welcome to Our Artisan Family</h1>
          </div>
          
          <div class="content">
            <h2>Hello ${firstName},</h2>
            <p class="welcome-message">We're delighted to welcome you to our community of design enthusiasts.</p>
            
            <div class="features">
              <h3>Your Member Benefits</h3>
              <ul>
                <li>Priority Access to New Collections</li>
                <li>Exclusive Seasonal Discounts</li>
                <li>Complimentary Design Consultation</li>
                <li>Craftsmanship Insights Newsletter</li>
              </ul>
            </div>
      
            <div class="promo-code">
              <p>Your Welcome Gift</p>
              <strong>WELCOME10</strong>
              <p>10% Off Your First Purchase</p>
              <small>Valid for 30 days from today</small>
            </div>
      
            <div class="cta-container">
              <a href="${products}" class="button">
                Explore Our Collection
              </a>
            </div>
      
            <div class="social-links">
              <p>Join Our Artisan Community</p>
              <a href="https://facebook.com/artisanwoodendoors">Facebook</a>
              <a href="https://instagram.com/artisanwoodendoors">Instagram</a>
              <a href="https://pinterest.com/artisanwoodendoors">Pinterest</a>
            </div>
          </div>

          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Artisan Wooden Doors</p>
            <p>Questions? Email us at <a href="mailto:support@artisanwoodendoors.com">support@artisanwoodendoors.com</a></p>
            <p><a href="${unsubscribeUrl}">Unsubscribe</a> | <a href="${process.env.FRONTEND_URL}/privacy">Privacy Policy</a></p>
          </div>
        </div>
      </body>
    </html>`;
  } catch (error) {
    logger.error('Error generating welcome template:', error);
    throw error;
  }
};