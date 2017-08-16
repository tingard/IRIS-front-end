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
  utype: String,
});

bviUserSchema.methods.setDefaults = () => {
  Object.assign(this, {
    creationDate: Date.now(),
    lastLogin: Date.now(),
    emailVerified: false,
    submittedImages: 0,
    acceptedResponses: 0,
    emailNotifications: true,
    utype: 'bviUsr',
  });
};

module.exports = mongoose.model('BviUser', bviUserSchema);
