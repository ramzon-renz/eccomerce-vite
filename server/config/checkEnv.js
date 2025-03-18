export const requiredEnvVars = [
  'MONGODB_URI',
  'EMAIL_USER',
  'EMAIL_PASS',
  // 'EMAIL_SECRET', // Comment out or remove this line
  'FRONTEND_URL'
];

export const checkEnvironment = () => {
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};