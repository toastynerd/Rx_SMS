'use strict';
const Router = require('express').Router;
const DrugSchema = require('../models/drugschema');
const HandleError = require('../controller/errhandler');
let interactionRouter = module.exports = exports = Router();

interactionRouter.get('/interactions/:userId/:drugName', function(req, res, next) {
  let drugName = req.params.drugName;
  DrugSchema.find({'userId': req.params.userId})
  .then((drugs) => {
    if (!drugs) return HandleError(404, next)(new Error('Drugs not found'));
    var drugArray = [];
    drugs.forEach(function(item) {
      item.interactions.forEach(function(q) {
        if (q.drugname === drugName){
          drugArray.push(q.interaction);
          console.log('q.drugname', drugArray);
        }
      });
    });
    if (drugArray.length > 0) {
      res.json(drugArray.toString());
      next();
    }
    return HandleError(404, next)(new Error('Drugs not found'));
  });
});
