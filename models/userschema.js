'use strict';

const mongoose = require('mongoose');
const DrugSchema = require('./drugschema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  basic: {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }
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

UserSchema.methods.createHash = function(password){
  return new Promise((resolve, reject)=>{
    bcrypt.hash(password, 10, (err, data) =>{
      if (err) return reject(err);
      this.basic.password = data;
      resolve({token: jwt.sign({idd: this.basic.username}, process.env.APP_SECRET)});
    });
  });
};

UserSchema.methods.comparePass = function(password){
  return new Promise((resolve, reject) =>{
    bcrypt.compare(password, this.basic.password, (err, data) => {
      if (err) return reject(err);
      if (data === false) return reject(new Error('No matching password'));
      resolve({token: jwt.sign({idd: this.basic.username}, process.env.APP_SECRET)});
    });
  });
};

module.exports = exports = mongoose.model('User', UserSchema);
