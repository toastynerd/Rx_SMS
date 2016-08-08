'use strict';

const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  drug: {
    type: String,
    required: true,
    unique: true
  },
  interactions: [
    {
      drugname: {
        type: String
      },
      interaction: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model('Drug', drugSchema);
