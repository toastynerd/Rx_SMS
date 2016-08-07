'use strict';

const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  drug: {
    type: String,
    required: true,
    unique: true,
  },
  interaction: {
    type: Array
  }
});

module.exports = mongoose.model('Drug', drugSchema);
