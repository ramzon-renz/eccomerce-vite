import { welcomeTemplate } from '../templates/email/welcome.js';
import { quotationTemplate } from '../templates/email/quotation.js';
import { logger } from './logger.js';

class EmailTemplateManager {
  constructor() {
    this.templates = {
      welcome: welcomeTemplate,
      quotation: quotationTemplate
    };
    this.cache = new Map();
  }

  validateTemplateData(type, data) {
    const requiredFields = {
      welcome: ['email'],
      quotation: ['email', 'firstName', 'lastName'] // Updated required fields
    };

    const fields = requiredFields[type];
    if (!fields) return true;

    const missing = fields.filter(field => {
      if (type === 'quotation') {
        return !data.formData?.[field];
      }
      return !data[field];
    });

    if (missing.length > 0) {
      throw new Error(`Missing required fields for ${type}: ${missing.join(', ')}`);
    }

    return true;
  }

  async render(type, data) {
    try {
      const template = this.templates[type];
      if (!template) {
        throw new Error(`Template type '${type}' not found`);
      }

      // Clone data to avoid modifying the original
      const templateData = { ...data };

      // Validate and set defaults
      this.validateTemplateData(type, templateData);

      // Check cache for identical renders
      const cacheKey = `${type}-${JSON.stringify(templateData)}`;
      if (this.cache.has(cacheKey)) {
        logger.info(`Using cached template for ${type}`);
        return this.cache.get(cacheKey);
      }

      const rendered = await template(templateData);
      this.cache.set(cacheKey, rendered);
      return rendered;
    } catch (error) {
      logger.error(`Error rendering template ${type}:`, error);
      throw error;
    }
  }

  clearCache() {
    this.cache.clear();
    logger.info('Template cache cleared');
  }
}

export const templateManager = new EmailTemplateManager();