const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const db = require('../connections/dbMaster');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: 0,
  },
  isBlacklisted: {
    type: Boolean,
    default: 0,
  },
  apiCalls: {
    type: Number,
    default: 0,
  },
  created: { type: Date, default: Date.now },
});

module.exports = db.model('Users', userSchema);
