'use strict';
const Router = require('express').Router;
const GridSchema = require('../models/sendgridschema');
const jsonParser = require('body-parser').json();
const sendGrid = require('../lib/sendgrid');
const UserSchema = require('../models/userschema');
const DrugSchema = require('../models/drugschema');
const HandleError = require('../controller/errhandler');
let parseRouter = Router();

const unique = function(a) {
  return Array.from(new Set(a));
};

const getInteractions = function(phoneEmail, drug) {
  return new Promise((resolve, reject) => {
    UserSchema.find({'phoneEmail': phoneEmail})
      .then((user) => {
        if(!user) return reject('User not found');
        let userId = user[0]._id;
        let drugName = drug.trim();
        DrugSchema.find({'userId': userId})
          .then((drugs) => {
            if (!drugs) return reject('Drugs not found');
            var drugArray = [];
            drugs.forEach(function(item) {
              item.interactions.forEach(function(q) {
                if (q.drugname.toUpperCase() === drugName.toUpperCase()){
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

parseRouter.post('/', jsonParser, function(req, res, next) {
  let testingIncoming = req.body.HtmlBody.toString();
  let removeHtml = testingIncoming.replace(/<[^>]*>?/gm, '');
  let removeDashes = removeHtml.replace(/-_/gm, '');
  let content = removeDashes.replace('Sent from my mobile.', '');
  let phoneEmail = req.body.From;
  let gridSchema = new GridSchema({'phoneNumber': phoneEmail, 'text': content});
  gridSchema.save((err, grid) => {
    if (err) return next(err);
    console.log('interaction paramaters: ', grid.phoneNumber, grid.text);
    getInteractions(grid.phoneNumber, grid.text)
      .then((data) => {
        if(data.length === 0) data = 'no interactions found';
        sendGrid(phoneEmail, data);
        res.json(grid);
      }, (err) => {
        if(err) return HandleError (404, next, err);
      });
  });
});

//TODO delete => for testing from command line:
parseRouter.get('/test/:phoneEmail/:drug', function(req, res, next) {
  getInteractions(req.params.phoneEmail, req.params.drug)
  .then((data) => {
    if(data.length === 0) data = 'no interactions found';
    sendGrid(req.params.phoneEmail, data);
  }, (err) => {
    if(err) return HandleError (404, next, err);
  });
});

module.exports = exports = parseRouter;
