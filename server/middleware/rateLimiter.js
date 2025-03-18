import rateLimit from 'express-rate-limit';

// Create a rate limiter function
export const createRateLimiter = ({ windowMs, max }) => {
  return rateLimit({
    windowMs: windowMs || 15 * 60 * 1000, // Default to 15 minutes
    max: max || 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' },
  });
};

// You can also define other limiters here if needed
export const subscriptionLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 requests per window
});

export const contactFormLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit to 10 requests per window
  message: { error: 'Too many contact form submissions. Please try again later.' }
});