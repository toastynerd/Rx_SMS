'use strict';

const mongoose = require('mongoose');
const DrugSchema = require('./drugschema');

const UserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  carrier: {
    type: String,
    required: true
  },
  phoneEmail: String,
  // basic: {
  //   username: {
  //     type: String,
  //     // required: true
  //   },
  //   password: {
  //     type: String,
  //     // required: true
  //   }
  // }
});

UserSchema.methods.newDrug = function(drugData){
  let drug = new DrugSchema(drugData);
  drug.userId = this._id;
  return drug.save();
};

UserSchema.methods.addDrug = function(drugId) {
  return DrugSchema.findOneAndUpdate({'_id': drugId}, {userId: this._id});
};

UserSchema.methods.getAllDrugs = function() {
  return DrugSchema.find({userId: this._id});
};

UserSchema.methods.removeDrug = function(drugId) {
  return DrugSchema.findOneAndUpdate({'_id': drugId}, {userId: null});
};

module.exports = mongoose.model('User', UserSchema);
