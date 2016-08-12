'use strict';
const Router = require('express').Router;
const GridSchema = require('../models/sendgridschema');
const jsonParser = require('body-parser').json();
const sendGrid = require('../lib/sendgrid');
const UserSchema = require('../models/userschema');
const DrugSchema = require('../models/drugschema');
const HandleError = require('../controller/errhandler');
const htmlToText = require('html-to-text');
const Promise = require('../lib/promise');

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
        let drugName = drug;
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

const convertEmailFromHtml = function(string){
  let content = htmlToText.fromString(string, {
    wordwrap: null,
    ignoreImage: true,
    ignoreHref: true,
  })
  .replace(/\(([^()]+)\)/gm, '')
  .replace('Sent from my mobile.', '')
  .replace('TMobile', '');
  return content;
};

parseRouter.post('/', jsonParser, function(req, res, next) {
  let phoneEmail = req.body.From;
  let emailContent = convertEmailFromHtml(req.body.HtmlBody.toString());
  //TODO Handle async before using emailContent in gridSchema
  let gridSchema = new GridSchema({'phoneNumber': phoneEmail, 'text': emailContent});
  gridSchema.save((err, grid) => {
    if (err) return next(err);
    getInteractions(grid.phoneNumber, grid.text)
      .then((data) => {
        if(data.length === 0) data = 'no interactions found';
        sendGrid(phoneEmail, data);
        res.json(data);
      }, (err) => {
        if(err) return HandleError (404, next, err);
      });
  });
});

module.exports = exports = parseRouter;
