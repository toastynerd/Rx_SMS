'use strict';

const Router = require('express').Router;

let homeRouter = module.exports = exports = Router();

homeRouter.get('/', (req, res, next) => {
  res.json('home');
  next();
});
