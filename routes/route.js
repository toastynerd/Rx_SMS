'use strict';

const Router = require('express').Router;
const rxnormIdHandler = require('../controller/rxnormidhandler');
let drugRouter = Router();

drugRouter.get('/:name', (req, res) => {
  let interactions = rxnormIdHandler(req.params.name);
  res.status(200).send(interactions);
});


module.exports = drugRouter;
