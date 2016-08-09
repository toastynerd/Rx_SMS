'use strict';
const Router = require('express').Router;
const GridSchema = require('../models/sendgridschema');
const jsonParser = require('body-parser').json();
const HandleError = require('../controller/errhandler');
let parseRouter = Router();

parseRouter.post('/', jsonParser, function(req, res, next) {
  console.log('inboundxxxxxx');
  let gridSchema = new GridSchema({'text': req.body.text});
  gridSchema.save((err, grid) => {
    if (err) return next(err);
    res.json(grid);
  });
});

parseRouter.get('/', function(req, res, next) {
  GridSchema.find().then(res.json.bind(res), HandleError(500, next, 'Server error!'));
});

module.exports = exports = parseRouter;
