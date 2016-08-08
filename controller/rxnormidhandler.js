'use strict';

const request = require('request');

module.exports = exports = function(name){
  return new Promise((resolve) => {
    request('https://rxnav.nlm.nih.gov/REST/rxcui.json?name=' + name, function (error, response) {
      if (!error && response.statusCode == 200) {
        let bodyObj = JSON.parse(response.body);
        let rxnormId = bodyObj.idGroup.rxnormId.toString();
        resolve(rxnormId);
      }
    });
  });
};
