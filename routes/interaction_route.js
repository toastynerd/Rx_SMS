'use strict';
const Router = require('express').Router;
const DrugSchema = require('../models/drugschema');
const HandleError = require('../controller/errhandler');
let interactionRouter = module.exports = exports = Router();
const unique = function(a) {
  return Array.from(new Set(a));
};

interactionRouter.get('/interactions/:userId/:drugName', function(req, res, next) {
  let drugName = req.params.drugName.split('%').join(' ');
  DrugSchema.find({'userId': req.params.userId})
  .then((drugs) => {
    if (!drugs) return HandleError(404, next)(new Error('Drugs not found'));
    var drugArray = [];
    drugs.forEach(function(item) {
      item.interactions.forEach(function(q) {
        if (q.drugname === drugName){
          drugArray.push('Interaction between ' + item.drug + ' and ' + q.drugname + ': ' + q.interaction);
        }
      });
    });
    if (drugArray.length > 0) {
      let uniqueArr = unique(drugArray);
      res.json(uniqueArr.join(' ').toString());
      next();
    }
    return HandleError(404, next)(new Error('No interactions found'));
  });
});

interactionRouter.get('/interactions/:userId', function(req, res, next) {
  DrugSchema.find({'userId': req.params.userId})
  .then((drugs) => {
    if (!drugs) return HandleError(404, next)(new Error('Drugs not found'));
    var drugArray = [];
    drugs.forEach(function(item) {
      drugArray.push('DRUGS INTERACTING WITH ' + item.drug.toUpperCase() + ':');
      item.interactions.forEach(function(q) {
        drugArray.push(q.drugname);
      });
    });
    if (drugArray.length > 0) {
      let uniqueArr = unique(drugArray);
      res.json(uniqueArr);
      next();
    }
    return HandleError(404, next)(new Error('No interactions found'));
  });
});
