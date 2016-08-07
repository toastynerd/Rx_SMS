'use strict';

const request = require('request');

module.exports = exports = function(rxnormId){
  let interactionArr = [];
  request('https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=' + rxnormId, function (error, response) {
    if (!error && response.statusCode == 200) {
      let bodyObj = JSON.parse(response.body);
      let interactionPairs = bodyObj.interactionTypeGroup[0].interactionType[0].interactionPair;
      for(var i = 0; i < interactionPairs.length; i++){
        var interaction = '{"' + interactionPairs[i].interactionConcept[1].sourceConceptItem.name + '": "' +
        interactionPairs[i].description + '"}';
        interactionArr.push(interaction);
      }
      console.log(interactionArr);
      return interactionArr;
    }
  });
};
