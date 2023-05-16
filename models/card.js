const mongoose = require('mongoose');
const { isValidHttpUrl } = require('../utils/validation')

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: isValidHttpUrl,
      message: 'Неправильный формат ссылки'
    }
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
  likes: [mongoose.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('card', cardSchema);