'use strict';

const Router = require('express').Router;
const interactionHandler = require('../controller/interactionhandler');
const rxnormidHandler = require('../controller/rxnormidhandler');
const DrugSchema = require('../models/drugschema');
let drugRouter = Router();

drugRouter.post('/:drugname', (req, res, next) => {
  rxnormidHandler(req.params.drugname)
  .then((rxnormId) => {
    return interactionHandler(rxnormId);
  }).then((interactions) => {
    let newDrug = new DrugSchema({'drug': req.params.drugname, 'interactions': interactions});
    newDrug.save((err, drugData) => {
      if (err) return next(err);
      res.send(drugData);
    });
  });
});


module.exports = drugRouter;
