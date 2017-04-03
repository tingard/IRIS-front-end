const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const imageSchema = new Schema({
  owner: String,
  uploadDate: Date,
  tag: String,
  level: Number,
  hasReply: Boolean,
  comment: String,
  question: String,
});

module.exports = mongoose.model('image', imageSchema);
