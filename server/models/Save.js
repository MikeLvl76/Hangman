const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Save = new Schema({
  pseudo: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  try_count: {
    type: Number,
    required: true,
  },
  correct: {
    type: Number,
    required: true,
  },
  wrong: {
    type: Number,
    required: true,
  },
  is_found: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Save', Save);
