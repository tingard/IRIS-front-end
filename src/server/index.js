/* eslint-disable no-console, no-param-reassign, array-callback-return, no-shadow */
const express = require('express');
const path = require('path');

const config = require('./config');

const app = express();
const port = config.PORT;
const domain = config.domain || '0.0.0.0';

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Main Website
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// serve up compiled static assets if we're in production mode
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => {
  app.use(express.static(path.join(__dirname, '../../dist')));
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.listen(port, domain, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
