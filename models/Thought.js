const mongoose = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true,
    ref: 'user'
  },
  reactions: [Reaction.schema]
});

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;