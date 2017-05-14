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

volunteerSchema.methods.setDefaults = () => {
  Object.assign(this, {
    creationDate: Date.now(),
    lastLogin: Date.now(),
    emailVerified: false,
    acceptedResponses: 0,
    rejectedResponses: 0,
    emailNotifications: false,
    browserNotifications: true,
    utype: 'volunteer',
  });
};

module.exports = mongoose.model('Volunteer', volunteerSchema);
