const mongoose = require('mongoose')

var Schema = mongoose.Schema;

const volUser = new Schema({
  email: String,
  pwd: String,
  creationDate: Date,
  lastLogin: Date,
  emailVerified: Boolean,
  acceptedResponses: Number,
  rejectedResponses: Number,
  emailNotifications: Boolean,
  browserNotifications: Boolean,
})

module.exports = volUser;
