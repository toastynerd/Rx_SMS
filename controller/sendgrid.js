'use strict';

const sendGrid = require('sendgrid');

function sendEmail(number, carrier, interactions){
  sendGrid.send({
    to: number + carrier,
    from: 'radcliffe.tracey@gmail.com',
    subject: 'Drug Interactions',
    text: 'This is where the interactions will go' + interactions
  }, function(err, json){
    if(err) return console.log(err);
    console.log(json);
  });
}

sendEmail('3602694800', '@tmomail.net', 'why yes there are some. wouldnt you like to know');
