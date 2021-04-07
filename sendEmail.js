const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly'
];
const TOKEN_PATH = 'token.json';

function authorize(credentials, callback, emailObject) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback, emailObject);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, emailObject);
  });
}

function getNewToken(oAuth2Client, callback, emailObject) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client, emailObject);
    });
  });
}

function makeBody(emailObject) {
  var str = ["Content-Type: text/html; charset=\"UTF-8\"\n",
      "MIME-Version: 1.0\n",
      "Content-Transfer-Encoding: 7bit\n",
      "to: ", emailObject.to, "\n",
      "from: ", emailObject.from, "\n",
      "subject: ", emailObject.subject, "\n\n",
      emailObject.message
  ].join('');

  var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
      return encodedMail;
}


function callSendAPI(auth, emailObject) {
  const gmail = google.gmail({version: 'v1', auth});
  
  var raw = makeBody(emailObject);
  gmail.users.messages.send({
      auth: auth,
      userId: 'me',
      resource: {
          raw: raw
      }
  }, function(err, response) {
      console.log(err || response);
  });
}

function sendEmail(emailObject) {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), callSendAPI, emailObject);
  });
}

module.exports = {
  sendEmail
};

