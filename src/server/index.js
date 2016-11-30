/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// serve up compiled static assets if we're in production mode
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
