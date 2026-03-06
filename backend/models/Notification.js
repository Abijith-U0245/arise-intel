const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipientRole: {
    type: String,
    enum: ['admin', 'hod', 'faculty', 'student'],
    required: true
  },
  type: {
    type: String,
    enum: ['risk_alert', 'attendance_drop', 'low_ia_score', 'missed_assignment', 'negative_sentiment', 'low_engagement', 'missing_competition', 'academic', 'general'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  studentName: String,
  studentErpId: String,
  riskScore: Number,
  riskLevel: String,
  read: {
    type: Boolean,
    default: false
  },
  acknowledged: {
    type: Boolean,
    default: false
  },
  triggeredBy: {
    type: String,
    enum: ['system', 'faculty', 'hod', 'admin'],
    default: 'system'
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Index for faster queries
notificationSchema.index({ recipient: 1, read: 1 });
notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
