'use strict';

const request = require('request');

module.exports = exports = function(rxnormId){
  return new Promise((resolve) => {
    let interactionArr = [];
    request('https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=' + rxnormId, function (error, res) {
      if(error) return new Error;
      let bodyObj = JSON.parse(res.body);
      let interactionPairs = bodyObj.interactionTypeGroup[0].interactionType[0].interactionPair;
      for(var i = 0; i < interactionPairs.length; i++){
        let name = interactionPairs[i].interactionConcept[1].sourceConceptItem.name;
        let interactions = interactionPairs[i].description;
        interactionArr.push({'drugname': name, 'interaction': interactions});
      }
      resolve(interactionArr);
    });
  });
};
