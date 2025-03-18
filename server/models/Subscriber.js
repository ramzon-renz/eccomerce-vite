import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: props => `${props.value} is not a valid email address`
    }
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
  },
  unsubscribedAt: {
    type: Date
  },
  unsubscribedReason: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  validateBeforeSave: true  // Ensures validation happens before save
});

// Custom validation for preferences
subscriberSchema.pre('save', function(next) {
  if (this.preferences.productUpdates === false && this.preferences.specialOffers === false) {
    return next(new Error('Both product updates and special offers cannot be disabled at the same time.'));
  }
  next();
});
// Index for faster queries
// subscriberSchema.index({ email: 1 }, { unique: true });
subscriberSchema.index({ status: 1 });
subscriberSchema.index({ subscriptionDate: -1 });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
export default Subscriber;
