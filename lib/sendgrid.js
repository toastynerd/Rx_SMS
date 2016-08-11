'use strict';

module.exports = exports = function(phoneEmail, data){
  let helper = require('sendgrid').mail,
    from_email = new helper.Email(process.env.SENDGRID_USERNAME),
    to_email = new helper.Email(phoneEmail),
    subject = 'Rx_SMS',
    content = new helper.Content('text/plain', data),
    mail = new helper.Mail(from_email, subject, to_email, content);

  let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
};
