'use strict';

const Router = require('express').Router;
const interactionHandler = require('../controller/interactionhandler');
const rxnormidHandler = require('../controller/rxnormidhandler');
const HandleError = require('../controller/errhandler');
const DrugSchema = require('../models/drugschema');
const jsonParser = require('body-parser').json();
let drugRouter = Router();

drugRouter.post('/newDrug', jsonParser, function(req, res, next) {
  let error = HandleError(400, next, 'invalid id');
  if(!req.body.drug){
    return error();
  }
  rxnormidHandler(req.body.drug)
  .then((rxnormId) => {
    return interactionHandler(rxnormId);
  }).then((interactions) => {
    let newDrug = new DrugSchema({'drug': req.body.drug, 'interactions': interactions});
    newDrug.save((err, drugData) => {
      if (err) return next(err);
      res.send(drugData);
    });
  }).catch((e) =>{
    e = HandleError(400, next, 'Drug not found in the database');
    return e();
  });
});

drugRouter.get('/:drugId', function(req, res, next) {
  let DBError = HandleError(400, next, 'invalid id');
  let Err404 = HandleError(404, next);
  DrugSchema.findOne({'_id': req.params.drugId}).then((data) => {
    if (!data) return next(Err404(new Error('drug not found.')));
    res.json(data);
  }, DBError);
});

module.exports = exports = drugRouter;
