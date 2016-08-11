'use strict';

const Router = require('express').Router;

let homeRouter = module.exports = exports = Router();

homeRouter.get('/', function(req, res, next) {
  res.json('Welcome to Rx SMS, a back-end text messaging drug interaction app. Please check out our README.md for instructions: github.com/aliza89p/Rx_SMS');
  next();
});
