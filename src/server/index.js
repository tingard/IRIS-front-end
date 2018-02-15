/* eslint-disable no-console, no-param-reassign, array-callback-return, no-shadow */
const express = require('express');
const path = require('path');

const config = require('./config');

const app = express();
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
    console.log('x-forwarded-proto', req['x-forwarded-proto']);
    next();
  });
}

app.get('/client-bundle.js', (req, res, next) => {
  req.url += '.gz';
  next();
});

app.get('/client-bundle.js.gz', (req, res, next) => {
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'application/javascript');
  next();
});
app.get('/', (req, res) => {
  console.log('>>> Recieved get request to "/"');
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.use(express.static(path.join(__dirname, '../../dist')));

app.listen(port, domain, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info(`==> 🌎 Listening on port ${port}. Open up http://${domain}:${port}/ in your browser.`);
  }
});
