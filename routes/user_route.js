'use strict';

const Router = require('express').Router;
const DrugSchema = require('../models/drugschema');
const UserSchema = require('../models/userschema');
const drugUser = require('./drug_user_route');
const jsonParser = require('body-parser').json();
const ErrorHandler = require('../controller/errhandler');

let userRouter = Router();

userRouter.post('/user', jsonParser, (req, res, next) =>{
  // let handleBadValidation = ErrorHandler(400, next);
  let phoneNumber = req.body.phoneNumber;
  let newUser = new UserSchema({'phoneNumber': phoneNumber});
  newUser.save((err, userData) =>{
    if (err) return next(err);
    res.send(userData);
  });
});

module.exports = exports = userRouter;
