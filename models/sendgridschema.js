'use strict';

const mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
  phoneNumber: String,
  text: String
});

module.exports = mongoose.model('Grid', gridSchema);
