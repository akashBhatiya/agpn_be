const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  securityCode: {
    type: String,
    required: true
  },
  securityCodeExpiry: {
    type: Date,
  },
  isInvited: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  officeId: [{
    type: Schema.Types.ObjectId,
    ref: 'Office',
    required: true
  }],
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  password: {
    type: String,
    required: true
  },
  emailFrequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'weekly'
  },
  failedAttempt: {
    type: Number,
    default: 0
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  loginAttempt: {
    type: Number,
    default: 0
  },
  position: {
    type: String,
    enum: ['IC', 'OL', 'DL', 'superAdmin', 'biller', 'OC', 'OS'],
    required: true
  },
  permissionGroup: {
    type: Schema.Types.ObjectId,
    ref: 'PermissionGroup',
    required: true
  },
  newEmail: {
    type: String
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
