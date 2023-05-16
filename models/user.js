const mongoose = require('mongoose');
const { isValidHttpUrl } = require('../utils/validation')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: isValidHttpUrl,
      message: 'Неправильный формат ссылки'
    }
  }
});

module.exports = mongoose.model('user', userSchema);