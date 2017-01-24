var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
  url: String,
  owner: String,
  likes: Array
});

module.exports = mongoose.model('Images', Images);