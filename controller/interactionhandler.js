'use strict';

const request = require('request');

module.exports = exports = function(rxnormId){
  let interactionArr = [];
  request('https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=' + rxnormId, function (error, res) {
    if(error) return new Error;
    let bodyObj = JSON.parse(res.body);
    let interactionPairs = bodyObj.interactionTypeGroup[0].interactionType[0].interactionPair;
    for(var i = 0; i < interactionPairs.length; i++){
      interactionArr.push('{"' + interactionPairs[i].interactionConcept[1].sourceConceptItem.name + '": "' +
      interactionPairs[i].description + '"}');
    }
    // Interaction array IS available here...
    debugger;
    console.log('interactionArr: ' + interactionArr);
    return interactionArr;
  });
  // interaction array IS NOT available here...
  //Need array available here to use information in our route.
  debugger;
  console.log('interactionArr: ' + interactionArr);
};
