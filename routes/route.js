'use strict';

const Router = require('express').Router;
// const ErrorHandler = require('../lib/errhandler');
// const http = require('http');
const request = require('request');
const drugRouter = module.exports = exports = Router();

drugRouter.get(':name', function(req, res){
  debugger;
  if (!req.params.name) {
    res.status(500);
    res.send({'Error': 'Looks like you are not senging the product id to get the product details.'});
    console.log('Looks like you are not   senging the product id to get the product detsails.');
  }

  request.get({url: 'https://rxnav.nlm.nih.gov/REST/rxcui.json?name=' + req.params.name}, function(err, response, body){
    debugger;
    if(!err && response.statusCode === 200){
      debugger;
      res.json(body);
    }
  });
});
