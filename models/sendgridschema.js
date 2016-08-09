'use strict';

const mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
  text: String
});

module.exports = mongoose.model('Grid', gridSchema);
