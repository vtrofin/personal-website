const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const got = require('got');
const { OAuth2 } = google.auth;
const get = require('lodash.get');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({
      message: `${req.method} method not available. Try a POST request`,
      response: 'error',
    });
  }

  const contactToken = get(req, 'query.token', '');
  if (contactToken !== process.env.VUE_APP_CONTACT_TOKEN) {
    return res.status(401).json({ message: 'Not authorized', response: 'error' });
  }

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
    auth: { type: 'OAuth2', user: sender, clientId, clientSecret: secret, refreshToken },
  };
  const mailer = nodemailer.createTransport(transport);

  const senderName = get(req, 'body.name', '[No name]');
  const senderEmail = get(req, 'body.email');
  const formMessage = get(req, 'body.message');
  if (!senderEmail || !formMessage) {
    return res
      .status(400)
      .json({ message: `No ${!senderEmail ? 'email' : 'message'} provided`, response: 'error' });
  }

  try {
    const split = senderEmail.split('@');
    const domain = split[1];
    if (!domain) {
      throw new Error(`Invalid email address ${senderEmail}`);
    }

    const response = await got(`https://disposable.help/domain/${domain}`);
    if (response.body) {
      throw new Error('Disposable email not allowed');
    }
  } catch (err) {
    const regexp = new RegExp('404', 'gi');
    const isNotFound = regexp.test(err.message || '');
    if (!isNotFound) {
      return res.status(400).json({ message: err.message, response: 'error' });
    }
    // let the request continue if email domain is not found in database of disposable emails
  }

  const message = {
    from: sender,
    to: [receiver],
    subject: get(req, 'body.subject', '[No subject]'),
    html: `
    <p>From: ${senderName} &lt;${senderEmail}&gt;</p>
    <p>Message: ${formMessage}</p> 
    `,
  };

  try {
    const emailResp = await mailer.sendMail(message);
    const accepted = emailResp && emailResp.accepted;
    if (!accepted || !accepted.length) {
      throw new Error('Failed to send message. No receiver accepted the message');
    }
    return res.status(200).json({ message: 'Email sent successfully', response: 'success' });
  } catch (err) {
    const message = err.message;
    return res.status(400).json({ message, response: 'error' });
  }
};
