'use strict';

const Router = require('express').Router;
const HandleError = require('../controller/errhandler');
const UserSchema = require('../models/userschema');
const sendGrid = require('../lib/sendgrid');
const jsonParser = require('body-parser').json();
const carrierHandler = require('../controller/carrierhandler');
const BasicHTTP = require('../lib/http_handle');

let userRouter = Router();

userRouter.post('/signup', jsonParser, function(req, res, next) {
  let errz = HandleError(400, next, 'Nope');

  //could be a good idea to let mongoose handle this kind of validation
  //put required: true on each of these fields and then pump req.body
  //into a new one, let Mongoose take care of the rest.
  if(!req.body.carrier || !req.body.phoneNumber || !req.body.username || !req.body.password){
    return errz();
  }
  let email = carrierHandler(req.body.phoneNumber, req.body.carrier);
  let newUser = new UserSchema({'phoneNumber': req.body.phoneNumber, 'carrier': req.body.carrier, 'phoneEmail': email});

  newUser.basic.username = req.body.username;
  newUser.basic.password = req.body.password;
  newUser.createHash(req.body.password)
    .then((token) => {
      newUser.save().then(() =>{
        sendGrid(newUser.phoneEmail, 'Welcome to Rx_SMS :)\nDisclaimer: This is intended for educational purposes only. For advice on medications, please consult with a qualified physician. To start, respond with a new drug name');
        res.json(token);
      }, HandleError(400, next));
    }, HandleError(401, next, 'Server Error'));
});

userRouter.get('/signin', BasicHTTP, function(req, res, next) {
  let DBError = HandleError(400, next, 'invalid id');
  let Err404 = HandleError(404, next, 'could not authorize');
  if(!req.auth.username || !req.auth.password) return Err404();
  //nice concise code
  UserSchema.findOne({'basic.username': req.auth.username})
    .then((user) => {
      if (!user) return Err404();
      user.comparePass(req.auth.password)
        .then(res.json.bind(res), Err404);
    }, DBError);
});

module.exports = exports = userRouter;
