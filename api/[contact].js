const nodemailer = require('nodemailer');

module.exports = (req, res) => {
  // const body = req.body;
  // const cookies = req.cookies;
  const headers = req.headers;
  const query = req.query;

  // https://github.com/nodemailer/nodemailer/issues/1176#issuecomment-717837363
  const formattedPrivateKey = process.env.GOOGLE_SA_PRIVATE_KEY.replace(/\\n/g, '\n');

  const transport = {
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MY_EMAIL,
      serviceClient: process.env.GOOGLE_SA_CLIENT_ID,
      privateKey: formattedPrivateKey,
    },
  };
  const mailer = nodemailer.createTransport(transport);
  const message = {
    from: process.env.MY_EMAIL,
    to: [process.env.MY_EMAIL],
    subject: req.body.subject || '[No subject]',
    html: req.body.message || '[No message]',
  };

  return mailer
    .sendMail(message)
    .then(result => {
      res.json({ headers, result });
    })
    .catch((err, info) => {
      res.json({ headers, err, info });
    });
};
