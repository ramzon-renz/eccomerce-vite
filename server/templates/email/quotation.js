import { loadStyles } from '../../utils/styleLoader.js';
import { logger } from '../../utils/logger.js';

export const quotationTemplate = async ({ formData, orderSummary, subtotal }) => {
    if (!formData || !orderSummary || subtotal === undefined) {
        throw new Error('Missing required template data');
    }

    // Load global styles
    let styles = '';
    try {
        styles = await loadStyles('global.css');
        logger.info('Global styles loaded successfully for quotation template');
    } catch (error) {
        logger.warn('Failed to load global styles, using fallback:', error);
        styles = ''; // No fallback styles needed as we are using global.css
    }

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
                <h1>Custom Door Quotation</h1>
            </div>
            
            <div class="content">
                <div class="quote-header">
                    <h2>Quotation Details</h2>
                    <p class="quote-number">Quote #: ${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                    <p class="quote-date">Date: ${new Date().toLocaleDateString()}</p>
                </div>

                <p>Dear ${formData.firstName} ${formData.lastName},</p>
                <p>Thank you for your interest in our custom doors. Here are your quotation details:</p>
                
                <div class="customer-details">
                    <h3>Customer Information</h3>
                    <div class="detail-grid">
                        <div class="detail-group">
                            <span class="label">Contact Details</span>
                            <span class="value">${formData.firstName} ${formData.lastName}</span>
                            <span class="value">${formData.email}</span>
                            <span class="value">${formData.phone}</span>
                        </div>
                        
                        <div class="detail-group">
                            <span class="label">Shipping Address</span>
                            <span class="value">${formData.address}</span>
                            <span class="value">${formData.city}, ${formData.state} ${formData.zipCode}</span>
                        </div>
                    </div>
                </div>

                <div class="project-details">
                    <h3>Project Specifications</h3>
                    <div class="detail-group">
                        <span class="label">Installation Required</span>
                        <span class="value">${formData.installationRequired ? 'Yes' : 'No'}</span>
                        <span class="label">Preferred Contact Method</span>
                        <span class="value">${formData.preferredContactMethod}</span>
                    </div>

                    ${formData.additionalNotes ? `
                    <div class="notes">
                        <span class="label">Additional Requirements</span>
                        <p class="value">${formData.additionalNotes}</p>
                    </div>
                    ` : ''}
                </div>
                
                <div class="order-summary">
                    <h3>Order Summary</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left;">Item Name</th>
                                <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left;">Quantity</th>
                                <th style="border: 1px solid var(--border-color); padding: 8px; text-align: left;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderSummary.map(item => `
                                <tr>
                                    <td style="border: 1px solid var(--border-color); padding: 8px;">${item.name}</td>
                                    <td style="border: 1px solid var(--border-color); padding: 8px;">${item.quantity}</td>
                                    <td style="border: 1px solid var(--border-color); padding: 8px;">$${item.total}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="order-total">
                        <span class="label">Subtotal</span>
                        <span class="value">$${subtotal}</span>
                    </div>
                </div>

                <div class="next-steps">
                    <h3>What's Next?</h3>
                    <ol>
                        <li>Our team will review your requirements</li>
                        <li>We'll prepare a detailed quote within 24-48 hours</li>
                        <li>A design consultant will contact you to discuss options</li>
                        <li>Once approved, we'll begin production</li>
                    </ol>
                </div>
            </div>
            
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Artisan Wooden Doors</p>
                <p>Tel: (555) 123-4567 | Email: sales@artisanwoodendoors.com</p>
                <p class="footer-note">This is a quotation estimate. Final pricing may vary based on specific requirements and customizations.</p>
            </div>
        </div>
    </body>
    </html>`;
};