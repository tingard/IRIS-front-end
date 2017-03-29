/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bviUser = require('./models/bvi-usr');

const app = express();
const port = process.env.PORT || 3000;

// ---- API ----
mongoose.connect('mongodb://localhost:27017')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const api = express.Router();

api.get('/', function(req, res, next) {
  res.json({message: 'welcome to the api!'})
});

app.use('/api', api);

// ---- Main website ----
// serve up compiled static assets if we're in production mode
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => {
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
