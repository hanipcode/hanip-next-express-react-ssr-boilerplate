const mongoose = require('mongoose');

const User = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  location_coordinate: String,
  location_name: String,
  profile_picture: { type: String, required: false },
  phone_number: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('User', User);
