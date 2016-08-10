'use strict';

const Router = require('express').Router;
const HandleError = require('../controller/errhandler');
const UserSchema = require('../models/userschema');
const drugUserRouter = require('./drug_user_route');
const jsonParser = require('body-parser').json();
const carrierHandler = require('../controller/carrierhandler');

let userRouter = Router();

userRouter.post('/newUser', jsonParser, function(req, res, next) {
  let errz = HandleError(400, next, 'Nope');
  if(!req.body.carrier || !req.body.phoneNumber){
    return errz();
  }
  let email = carrierHandler(req.body.phoneNumber, req.body.carrier);
  let newUser = new UserSchema({'phoneNumber': req.body.phoneNumber, 'carrier': req.body.carrier, 'phoneEmail': email});
  newUser.save((err, userData) =>{
    if (err) return next(errz());
    res.send(userData);
  });
});

userRouter.get('/allUsers', function(req, res, next) {
  UserSchema.find().then(res.json.bind(res), HandleError(400, next, 'Server Error'));
});

userRouter.get('/:userId', function(req, res, next) {
  let DBError = HandleError(400, next, 'invalid id');
  let Err404 = HandleError(404, next);
  UserSchema.findOne({'_id': req.params.userId}).then((data) => {
    if (!data) return next(Err404(new Error('user not found.')));
    res.json(data);
  }, DBError);
});

userRouter.use('/:userId/drug', drugUserRouter);

module.exports = exports = userRouter;
