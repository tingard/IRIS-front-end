const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const volunteerSchema = new Schema({
  email: String,
  pwd: String,
  firstName: String,
  lastName: String,
  creationDate: Date,
  lastLogin: Date,
  emailVerified: Boolean,
  acceptedResponses: Number,
  rejectedResponses: Number,
  emailNotifications: Boolean,
  browserNotifications: Boolean,
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
