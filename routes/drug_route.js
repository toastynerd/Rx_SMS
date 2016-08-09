'use strict';

const Router = require('express').Router;
const interactionHandler = require('../controller/interactionhandler');
const rxnormidHandler = require('../controller/rxnormidhandler');
const HandleError = require('../controller/errhandler');
const DrugSchema = require('../models/drugschema');
const jsonParser = require('body-parser').json();
let drugRouter = Router();

drugRouter.post('/newDrug', jsonParser, (req, res, next) => {
  rxnormidHandler(req.body.drug)
  .then((rxnormId) => {
    return interactionHandler(rxnormId);
  }).then((interactions) => {
    let newDrug = new DrugSchema({'drug': req.body.drug, 'interactions': interactions});
    newDrug.save((err, drugData) => {
      if (err) return next(err);
      res.send(drugData);
    });
  });
});

drugRouter.get('/:drugId', (req, res, next) => {
  let DBError = HandleError(400, next, 'invalid id');
  let Err404 = HandleError(404, next);
  DrugSchema.findOne({'_id': req.params.id}).then((data) => {
    if (!data) return next(Err404(new Error('drug not found.')));
    res.json(data);
  }, DBError);
});

drugRouter.get('/allDrugs', (req, res, next) => {
  DrugSchema.find().then(res.json.bind(res), HandleError(500, next, 'Server Error'));
});

module.exports = exports = drugRouter;
