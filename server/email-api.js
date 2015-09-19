var sendgrid = require('sendgrid')('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');

module.exports.sendgrid = function () {
  sendgrid.send({
    to: 'a@factorum.com.mx',
    from: 'arminbastian@gmail.com',
    subject: 'Hello World',
    text: 'My first API email',
  },
  function (err, json) {
    if(err) {return console.error(err);}
    console.log(json);
  });
};



