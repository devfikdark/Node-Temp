const mongoose = require('mongoose');

const authModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "provide a valid name"]
  },
  email: {
    type: String,
    required: [true, "provide a valid email"]
  },
  picture: {
    type: String,
    required: [true, "provide your profile picture"]
  }
});

const authModel = mongoose.model('authData', authModelSchema);

module.exports = authModel;