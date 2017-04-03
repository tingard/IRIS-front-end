const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bviUserSchema = new Schema({
  email: String,
  pwd: String,
  firstName: String,
  lastName: String,
  creationDate: Date,
  lastLogin: Date,
  emailVerified: Boolean,
  submittedImages: Number,
  acceptedResponses: Number,
  emailNotifications: Boolean,
});

module.exports = mongoose.model('BVIuser', bviUserSchema);
