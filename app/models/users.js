var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  twitter:{
    id: String,
    token: String,
    username: String,
    displayName: String,
    profileImage: String
  },
  created: Date
});

module.exports = mongoose.model('User', User);