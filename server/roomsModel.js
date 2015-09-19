var mongoose  = require('mongoose');

var RoomsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  messages: {
    type: Array
  },
  users: {
    type: Array
  },
  id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('rooms', RoomsSchema);