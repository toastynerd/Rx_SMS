'use strict';
const Router = require('express').Router;
const GridSchema = require('../models/sendgridschema');
// const UserSchema = require('../models/userschema');
const jsonParser = require('body-parser').json();
const sendGrid = require('../lib/sendgrid');
const HandleError = require('../controller/errhandler');
let parseRouter = Router();

parseRouter.post('/', jsonParser, function(req, res, next) {
  let preSplit = req.body.HtmlBody.toString().split('<PRE>');
  let afterSplit = preSplit[1].split('</PRE>');
  let content = afterSplit[0];
  let phoneEmail = req.body.From;
  console.log('email body: ', content);
  let gridSchema = new GridSchema({'phoneNumber': phoneEmail, 'text': content});
  gridSchema.save((err, grid) => {
    if (err) return next(err);
    res.json(grid);
  });
  sendGrid(phoneEmail);
});

// parseRouter.get('/:phoneEmail', function(req, res, next) {
//   UserSchema.findOne({'phoneEmail': req.params.phoneEmail})
//     .then((user) => {
//       if (!user) return HandleError(404, next)(new Error('User Not Found'));
//       req.user = user._id;
//       next();
//     }, HandleError(404, next, 'No Such User'));
// });

parseRouter.get('/', function(req, res, next) {
  GridSchema.find().then(res.json.bind(res), HandleError(500, next, 'Server error!'));
});

module.exports = exports = parseRouter;
