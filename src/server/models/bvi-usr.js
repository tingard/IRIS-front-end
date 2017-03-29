const mongoose = require('mongoose')

var Schema = mongoose.Schema;

const bviUserSchema = new Schema({
  email: String,
  pwd: String,
  creationDate: Date,
  lastLogin: Date,
  emailVerified: Boolean,
  submittedImages: Number,
  acceptedResponses: Number,
  emailNotifications: Boolean,
})

module.exports = mongoose.model('BVIuser', bviUserSchema);;
