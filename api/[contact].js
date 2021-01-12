const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const get = require('lodash.get');

module.exports = (req, res) => {
  const body = req.body;
  const headers = req.headers || {};
  // const cookies = req.cookies;
  // const query = req.query;

  const clientId = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;
  const refreshToken = process.env.REFRESH_TOKEN;
  const sender = process.env.SENDER_EMAIL;
  const receiver = process.env.RECEIVER_EMAIL;
  const redirectUrl = process.env.REDIRECT_URL;

  const oAuth2Client = new OAuth2(clientId, secret, redirectUrl);
  oAuth2Client.setCredentials({ refresh_token: refreshToken });
  const transport = {
    service: 'Gmail',
    auth: { type: 'OAuth2', user: sender, clientId, clientSecret: secret, refreshToken }
  };
  const mailer = nodemailer.createTransport(transport);

  const message = {
    from: sender,
    to: [receiver],
    subject: get(req, 'body.subject', '[No subject]'),
    html: get(req, 'body.message', '[No message]')
  };

  return mailer
    .sendMail(message)
    .then(result => {
      const accepted = result && result.accepted;
      if (!accepted || !accepted.length) {
        throw new Error('Failed to send message. No receiver accepted the message');
      }

      return res
        .status(200)
        .json({ headers, messageId: result.messageId, message: 'email sent successfully' }); // headers is dev only
    })
    .catch((err, info = {}) => {
      const message = err.message;
      return res
        .status(400)
        .json({
          headers,
          message,
          response: info.response,
          receiver,
          sender,
          clientId,
          secret,
          refreshToken,
          redirectUrl
        }); // headers is dev only
    });
};
