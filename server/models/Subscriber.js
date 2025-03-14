import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'bounced'],
    default: 'active'
  },
  subscriptionDate: {
    type: Date,
    default: Date.now
  },
  lastEmailSent: {
    type: Date
  },
  emailsSent: {
    type: Number,
    default: 0
  },
  preferences: {
    productUpdates: { type: Boolean, default: true },
    specialOffers: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: true }
  },
  metadata: {
    source: String,
    browser: String,
    platform: String
  }
}, {
  timestamps: true
});

// Index for faster queries
subscriberSchema.index({ email: 1 }, { unique: true });
subscriberSchema.index({ status: 1 });
subscriberSchema.index({ subscriptionDate: -1 });

export default mongoose.model('Subscriber', subscriberSchema); 