'use strict';

const User = require('../models/userschema');
const jsonParser = require('body-parser').json();
const express = require('express');
const HandleError = require('../controller/errhandle');

let userDrugRouter = module.exports = exports = express.Router({mergeParams: true});

let findUser = function(req, res, next) {
  User.findOne({'_id': req.params.userId})
    .then((user) => {
      if (!user) return HandleError(404, next)(new Error('User Not Found'));
      req.user = user;
      next();
    }, HandleError(404, next, 'No Such User'));
};

userDrugRouter.post('/', jsonParser, findUser, (req, res, next) => {
  req.user.newDrug(req.body).then(res.json.bind(res), HandleError(400, next));
});
