'use strict';

const Router = require('express').Router;
// const DrugSchema = require('../models/drugschema');
const UserSchema = require('../models/userschema');
const drugUserRouter = require('./drug_user_route');
const jsonParser = require('body-parser').json();

let userRouter = Router();

userRouter.post('/user', jsonParser, (req, res, next) => {
  let phoneNumber = req.body.phoneNumber;
  let newUser = new UserSchema({'phoneNumber': phoneNumber});
  newUser.save((err, userData) =>{
    if (err) return next(err);
    res.send(userData);
  });
});

userRouter.use('/:userId/drug', drugUserRouter);

module.exports = exports = userRouter;
