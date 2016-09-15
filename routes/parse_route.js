'use strict';
const Router = require('express').Router;
const GridSchema = require('../models/sendgridschema');
const jsonParser = require('body-parser').json();
const sendGrid = require('../lib/sendgrid');
const UserSchema = require('../models/userschema');
const DrugSchema = require('../models/drugschema');
const HandleError = require('../controller/errhandler');
let parseRouter = Router();

//clever
const unique = function(a) {
  return Array.from(new Set(a));
};

const getInteractions = function(phoneEmail, drug) {
  return new Promise((resolve, reject) => {
    //I don't know that this actually needs to be a promise
    //or at least you might want it further down the chai, right now
    //this makes this route feel a little cluttered/pyramid of doomy
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

parseRouter.post('/', jsonParser, function(req, res, next) {
  let testingIncoming = req.body.HtmlBody.toString();
  let removeHtml = testingIncoming.replace(/<[^>]*>?/gm, '');
  let removeTmo = removeHtml.replace(/&nbsp;/gm,'');
  let removeDashes = removeTmo.replace(/[-_]/gm, '');
  let removeNewLines = removeDashes.replace(/(\r\n|\n|\r|\t)/gm, '');
  let sprint = removeNewLines.replace('Sent from my mobile.', '');
  let tmobile = sprint.replace('TMobile', '');
  let content = tmobile.trim();
  let phoneEmail = req.body.From;
  let gridSchema = new GridSchema({'phoneNumber': phoneEmail, 'text': content});
  gridSchema.save((err, grid) => {
    //if you used the promise version of save, you could skip this check and
    //just pass next as the second argument of the .then call
    if (err) return next(err);
    getInteractions(grid.phoneNumber, grid.text)
      .then((data) => {
        if(data.length === 0) data = 'no interactions found';
        sendGrid(phoneEmail, data);
        res.json(data);
      }, (err) => {
        //don't need the if check here, if it's calling this function
        //there is definitely an error
        if(err) return HandleError (404, next, err);
      });
  });
});

module.exports = exports = parseRouter;
