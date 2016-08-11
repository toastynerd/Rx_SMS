'use strict';
const Router = require('express').Router;
const GridSchema = require('../models/sendgridschema');
const UserSchema = require('../models/userschema');
const DrugSchema = require('../models/drugschema');
const jsonParser = require('body-parser').json();
const sendGrid = require('../lib/sendgrid');
const HandleError = require('../controller/errhandler');
const unique = function(a) {
  return Array.from(new Set(a));
};
let interactionRouter = Router();

const getInteractions = function(phoneEmail, drug) {
  return new Promise((resolve, reject) => {
    UserSchema.find({'phoneEmail': phoneEmail})
      .then((user) => {
        if(!user) return reject('User not found');
        let userId = user._id;
        let drugName = drug.trim();
        DrugSchema.find({'userId': userId})
          .then((drugs) => {
            if (!drugs) return reject('Drugs not found');
            var drugArray = [];
            drugs.forEach(function(item) {
              item.interactions.forEach(function(q) {
                if (q.drugname === drugName){
                  drugArray.push('Interaction between ' + item.drug + ' and ' + q.drugname + ': ' + q.interaction);
                }
              });
            });
            let uniqueArr = unique(drugArray);
            resolve(uniqueArr.join(' ').toString());
          });
      });
  });
};

interactionRouter.get('/test/:phoneEmail/:drug', function(req, res, next) {
  getInteractions(req.params.phoneEmail, req.params.drug)
  .then((data) => {
    if(data.length === 0) data = 'no interactions found';
    sendGrid(req.params.phoneEmail, data);
  }, (err) => {
    if(err) return HandleError (404, next, err);
  });
});

interactionRouter.post('/', jsonParser, function(req, res, next) {
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
  getInteractions(phoneEmail, content)
    .then((data) => {
      if(data.length === 0) data = 'no interactions found';
      sendGrid(phoneEmail, data);
    }, (err) => {
      if(err) return HandleError (404, next, err);
    });
});

interactionRouter.get('/', function(req, res, next) {
  GridSchema.find().then(res.json.bind(res), HandleError(500, next, 'Server error!'));
});

module.exports = exports = interactionRouter;
