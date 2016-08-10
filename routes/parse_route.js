'use strict';
const Router = require('express').Router;
const GridSchema = require('../models/sendgridschema');
const jsonParser = require('body-parser').json();
const HandleError = require('../controller/errhandler');
let parseRouter = Router();

parseRouter.post('/', jsonParser, function(req, res, next) {
  let preSplit = req.body.HtmlBody.toString().split('<PRE>');
  let afterSplit = preSplit[1].split('</PRE>');
  let content = afterSplit[0];
  let phoneNumber = req.body.From;
  console.log('email body: ', content);
  let gridSchema = new GridSchema({'phoneNumber': phoneNumber, 'text': content});
  gridSchema.save((err, grid) => {
    if (err) return next(err);
    res.json(grid);
  });
});

parseRouter.get('/', function(req, res, next) {
  GridSchema.find().then(res.json.bind(res), HandleError(500, next, 'Server error!'));
});

module.exports = exports = parseRouter;
