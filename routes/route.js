'use strict';

const Router = require('express').Router;
const rxnormIdHandler = require('../controller/rxnormidhandler');
const DrugSchema = require('../models/drugschema');
let drugRouter = Router();

drugRouter.post('/:drugname', (req, res, next) => {
  let interactions = rxnormIdHandler(req.params.drugname);
  console.log(interactions);
  let newDrug = new DrugSchema({'drug': req.params.drugname, 'interactions': interactions});
  newDrug.save((err, drugData) => {
    if (err) return next(err);
    res.json(drugData);
  });
});


module.exports = drugRouter;
