/* eslint-disable no-console, no-param-reassign, array-callback-return,
  no-shadow, no-underscore-dangle */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const config = require('./config');
const api = require('./api');
const websocket = require('./websocket');
const authStrategy = require('./authentication');

const ExtractJwt = passportJWT.ExtractJwt;

const app = express();
/* eslint-disable no-unused-vars */
const expressWs = require('express-ws')(app);
/* eslint-enable no-unused-vars */
const port = process.env.PORT || 3000;

// function isVar(v) { return (typeof v !== 'undefined'); }

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// AUTHENTICATION
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

mongoose.connect('mongodb://localhost:27017');

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.secret;


passport.use(authStrategy);
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// -----------------------------------------------------------------------------
// Bind API to app
app.use('/api', api);

// -----------------------------------------------------------------------------
// Bind websocket to app
app.ws('/websocket', (ws) => {
  ws.on('message', websocket.onMessage);
});

// -----------------------------------------------------------------------------
// Main Website

// serve up compiled static assets if we're in production mode
app.use(express.static(path.join(__dirname, '../../dist')));

app.get(/\/#?/, (req, res) => {
  app.use(express.static(path.join(__dirname, '../../dist')));
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
