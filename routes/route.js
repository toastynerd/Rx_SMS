'use strict';

const Router = require('express').Router;
const rxnormIdHandler = require('../controller/rxnormidhandler');
let drugRouter = Router();

drugRouter.get('/:name', (req, res) => {
  let rxnormId = rxnormIdHandler(req.params.name);
  console.log(rxnormId);
  return res.status(200).send(rxnormId);
});


module.exports = drugRouter;
