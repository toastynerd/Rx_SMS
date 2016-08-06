'use strict';

const mongoose = require('mongoose');

const drugSchema = require('./drugschema');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  drugs: {
    drugs: [drugSchema],
  }
});

module.exports = mongoose.model('User', userSchema);
