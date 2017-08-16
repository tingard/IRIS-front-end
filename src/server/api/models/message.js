const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const messageSchema = new Schema({
  fromEmail: String,
  toEmail: String,
  sendDate: Date,
  message: String,
  imageId: String,
  isReply: Boolean,
  messageChain: Number,
  hasReply: Boolean,
});

module.exports = mongoose.model('message', messageSchema);
