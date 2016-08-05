'use strict';
let helper = require('sendgrid').mail,
  from_email = new helper.Email('radcliffe.tracey@gmail.com'),
  to_email = new helper.Email('2069312759@pm.sprint.com'),
  subject = 'hello world',
  content = new helper.Content('text/plain', 'AHHHHHHH'),
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
