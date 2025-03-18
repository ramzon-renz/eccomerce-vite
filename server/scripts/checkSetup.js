import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');

async function checkSetup() {
  const required = [
    'styles/global.css',
    'templates/email/welcome.js',
    'utils/emailTemplateManager.js'
  ];

  let allFilesFound = true;

  for (const file of required) {
    try {
      await fs.access(path.join(ROOT_DIR, file));
      logger.info(`✅ Found ${file}`);
    } catch {
      logger.error(`❌ Missing ${file}`);
      allFilesFound = false;
    }
  }

  if (!allFilesFound) {
    logger.warn('Some required files are missing. Please check the logs above.');
  } else {
    logger.info('All required files are present.');
  }
}

checkSetup().catch(error => {
  logger.error('Setup check failed:', error);
  process.exit(1);
});