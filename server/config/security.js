import helmet from 'helmet';
import cors from 'cors';

export const securityConfig = {
  initialize: () => [
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
    helmet.hidePoweredBy(),
    helmet.noSniff(),
    helmet.xssFilter(),
    cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true
    })
  ]
};