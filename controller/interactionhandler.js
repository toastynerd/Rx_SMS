'use strict';

const request = require('request');

module.exports = exports = function(rxnormId){
  request('https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=' + rxnormId, function (error, response) {
    if (!error && response.statusCode == 200) {
      console.log(response.body);
      return response.body;
    }
  });
};
