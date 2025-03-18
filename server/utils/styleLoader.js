import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const loadStyles = async (filename) => {
  try {
    const stylesPath = path.join(__dirname, '../styles', filename);
    const css = await fs.readFile(stylesPath, 'utf8');
    logger.info(`Styles loaded from ${filename}`);
    return css;
  } catch (error) {
    logger.error(`Error loading styles from ${filename}:`, error);
    throw error;
  }
};