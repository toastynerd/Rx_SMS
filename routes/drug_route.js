'use strict';

const Router = require('express').Router;
const interactionHandler = require('../controller/interactionhandler');
const rxnormidHandler = require('../controller/rxnormidhandler');
const DrugSchema = require('../models/drugschema');
const jsonParser = require('body-parser').json();
let drugRouter = Router();

drugRouter.post('/drug', jsonParser, (req, res, next) => {
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


module.exports = exports = drugRouter;
