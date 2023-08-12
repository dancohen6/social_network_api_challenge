const mongoose = require('mongoose');
const Thought = require('./Thought'); 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email address"
    }
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
