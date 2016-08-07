'use strict';

const request = require('request');

module.exports = exports = function(rxnormId){
  request('https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=' + rxnormId, function (error, response) {
    if (!error && response.statusCode == 200) {
      let bodyObj = JSON.parse(response.body);
      let interactionPairs = bodyObj.interactionTypeGroup[0].interactionType[0].interactionPair;
      for(var i = 0; i < interactionPairs.length; i++){
        console.log('{"' + interactionPairs[i].interactionConcept[1].sourceConceptItem.name + '": "' +
        interactionPairs[i].description + '"}');
      }
    }
  });
};
