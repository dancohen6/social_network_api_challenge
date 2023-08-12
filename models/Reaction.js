const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: mongoose.Schema.Types.ObjectId,
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reaction', reactionSchema);