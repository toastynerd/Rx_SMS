'use strict';

const request = require('request');
const interactionHandler = require('../controller/interactionhandler');

module.exports = exports = function(name){
  request('https://rxnav.nlm.nih.gov/REST/rxcui.json?name=' + name, function (error, response) {
    if (!error && response.statusCode == 200) {
      let bodyObj = JSON.parse(response.body);
      let rxnormId = bodyObj.idGroup.rxnormId.toString();
      console.log(rxnormId);
      return interactionHandler(rxnormId);
    }
  });
};
