'use strict';

const User = require('../models/userschema');
const jsonParser = require('body-parser').json();
const express = require('express');
const HandleError = require('../controller/errhandler');

let userDrugRouter = express.Router({mergeParams: true});

let findUser = function(req, res, next) {
  User.findOne({'_id': req.params.userId})
    .then((user) => {
      if (!user) return HandleError(404, next)(new Error('User Not Found'));
      req.user = user;
      next();
    }, HandleError(404, next, 'No Such User'));
};

userDrugRouter.get('/', findUser, (req, res, next) => {
  req.user.getAllDrugs()
    .then(res.json.bind(res), HandleError(500, next, 'server error'));
});

userDrugRouter.post('/', jsonParser, findUser, (req, res, next) => {
  req.user.newDrug(req.body.drugname).then(res.json.bind(res), HandleError(400, next));
});

userDrugRouter.put('/:id', findUser, (req, res, next) => {
  req.user.addDrug(req.params.id).then(res.json.bind(res), HandleError(404, next, 'No Such User'));
});

userDrugRouter.delete('/:id', findUser, (req, res, next) => {
  req.user.removeDrug(req.params.id).then(res.json.bind(res), HandleError(404, next, 'No Such User'));
});

module.exports = exports = userDrugRouter;
