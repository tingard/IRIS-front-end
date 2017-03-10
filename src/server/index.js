/* eslint-disable no-console */
const express = require('express');
const path = require('path');
// const ParseServer = require('parse-server').ParseServer;

const app = express();
const port = process.env.PORT || 3000;

// serve up compiled static assets if we're in production mode
app.use(express.static(path.join(__dirname, '../../dist')));

/* const api = new ParseServer({
  // Connection string for your MongoDB database:
  databaseURI: 'mongodb://localhost:27017/dev',
  // Absolute path to your Cloud Code:
  cloud: '/Users/tlingard/Documents/IRIS/src/server/cloud/main.js',
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:3000/parse' // Don't forget to change to https if needed
}); */

app.get('/', (req, res) => {
  app.use(express.static(path.join(__dirname, '../../dist')));
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// app.use('/parse', api);

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
