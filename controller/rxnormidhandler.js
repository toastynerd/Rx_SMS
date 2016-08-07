'use strict';

const request = require('request');
const interactionHandler = require('./interactionhandler');

module.exports = exports = function(name){
  request('https://rxnav.nlm.nih.gov/REST/rxcui.json?name=' + name, function (error, response) {
    if (!error && response.statusCode == 200) {
      let bodyObj = JSON.parse(response.body);
      let rxnormId = bodyObj.idGroup.rxnormId.toString();
      return interactionHandler(rxnormId);
    }
  });
};
