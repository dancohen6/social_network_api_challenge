const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27018/social_api');

module.exports = mongoose.connection;