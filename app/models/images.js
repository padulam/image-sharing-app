var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Images = new Schema({
  url: String,
  description: String,
  owner: String,
  likes: Array
});

module.exports = mongoose.model('Images', Images);