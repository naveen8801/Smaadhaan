const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  accepted: {
    type: Boolean,
    required: false,
  },
});

const RequestModel = mongoose.model('user-requests', userSchema);
module.exports = RequestModel;
