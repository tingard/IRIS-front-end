/* eslint-disable no-console, no-param-reassign, array-callback-return, no-shadow */
const express = require('express');
const path = require('path');
const helmet = require('helmet');

const config = require('./config');

const app = express();
app.use(helmet());
app.set('views', './src/server/views');
app.set('view engine', 'pug');

const port = config.PORT;
const domain = config.HOST;
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Main Website
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// serve up compiled static assets if we're in production mode
// app.use(express.static(path.join(__dirname, '../../dist')));

app.get(/\/.*?-bundle\.js(\.map)?/, (req, res, next) => {
  req.url += '.gz';
  next();
});

app.get(/\/.*?-bundle\.js(\.map)?\.gz/, (req, res, next) => {
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'application/javascript');
  next();
});

app.get(/\/((login.*)?|(create.*))$/, (req, res) => {
  res.render(
    'index',
    { clientBundleSource: '/main-bundle.js', styleSource: '/styles/main.css' },
  );
});

app.get(/\/student.*$/, (req, res) => {
  res.render(
    'index',
    { clientBundleSource: '/student-bundle.js', styleSource: '/styles/student.css' },
  );
});

app.get(/\/volunteer(\/.*)?$/, (req, res) => {
  res.render(
    'index',
    { clientBundleSource: '/volunteer-bundle.js', styleSource: '/styles/volunteer.css' },
  );
});

app.get('/licence-owner.*', (req, res) => {
  res.render(
    'index',
    { clientBundleSource: '/licence-owner-bundle.js', styleSource: '/styles/licence-owner.css' },
  );
});

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});


app.listen(port, domain, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info(`==> 🌎 Listening on port ${port}. Open up http://${domain}:${port}/ in your browser.`);
  }
});
