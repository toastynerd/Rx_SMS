'use strict';
const Router = require('express').Router;
const DrugSchema = require('../models/drugschema');
const HandleError = require('../controller/errhandler');
let interactionRouter = module.exports = exports = Router();

// let findInteractions = function(req, res, next) {
//
// }

interactionRouter.get('/:userId', function(req, res, next) {
  DrugSchema.find({'userId': req.params.userId})
  .then((drugs) => {
    if (!drugs) return HandleError(404, next)(new Error('Drugs not found'));
    res.json(drugs);
    next();
  });
});

interactionRouter.get('/:drugName', function(req, res, next) {
  DrugSchema.find({'interactions':{'drugname':req.params.drugName}})
  .then((drugs) => {
    if (!drugs) return HandleError(404, next)(new Error('Drugs not found'));
    res.json(drugs);
    next();
  });
});
