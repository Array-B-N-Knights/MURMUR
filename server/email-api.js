var sendgrid = require('sendgrid')('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');
var urlHtml ='';

module.exports.sendgrid = function (email) {
  sendgrid.send({
    to: email,
    from: 'arminbastian@gmail.com',
    subject: 'Welcome to Murmur, please verify email',
    text: 'Hi sport, please click this email to verify your account: ',
  },
  function (err, json) {
    console.log(json);
    if(err) {return console.error(err);}
    console.log(json);
  });
};



