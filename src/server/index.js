/* eslint-disable no-console, no-param-reassign, array-callback-return, no-shadow */
const express = require('express');
const path = require('path');
const helmet = require('helmet');

const config = require('./config');

const app = express();
console.log('helmeting');
app.use(helmet());

const port = config.PORT;
const domain = config.HOST;
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Main Website
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// serve up compiled static assets if we're in production mode
// app.use(express.static(path.join(__dirname, '../../dist')));

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res, next) => {
    console.log('is a secure connection?', req.secure, req.header('x-forwarded-proto'));
    next();
  });
}

app.get(/\/client-bundle\.js(\.map)?/, (req, res, next) => {
  req.url += '.gz';
  next();
});

app.get(/\/client-bundle\.js(\.map)?\.gz/, (req, res, next) => {
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'application/javascript');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/*', (req, r, next) => {
  console.log('got request to', req.path);
  next();
});

app.listen(port, domain, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info(`==> 🌎 Listening on port ${port}. Open up http://${domain}:${port}/ in your browser.`);
  }
});
