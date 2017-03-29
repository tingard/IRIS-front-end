/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Volunteer = require('./models/vol-usr');
const BviUser = require('./models/bvi-usr');

const app = express();
const port = process.env.PORT || 3000;

function isVar(v) { return typeof(v) !== 'undefined' }

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

mongoose.connect('mongodb://localhost:27017')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const api = express.Router();

api.get('/', function(req, res, next) {
  res.json({message: 'welcome to the api!'})
});

api.use(function(req, res, next) {
  // TODO: handle authentication here
  console.log(`🤖  "recieved api connection, www.grapheel.com/api${req.url}"`);
  next();
});

// TODO: break these off into separate files
//______________________________________________________________________________
// API - Volunteer Section

api.route('/volunteers')
  .post(function(req, res) {
    var volunteer = new Volunteer();
    if (isVar(req.body.email) && isVar(req.body.pwd)) {
      if (validateEmail(req.body.email)) {
        Object.assign(volunteer, {
          email: req.body.email,
          pwd: req.body.pwd, // TODO hashing etc...
          creationDate: Date.now(),
          lastLogin: Date.now(),
          emailVerified: false,
          acceptedResponses: 0,
          rejectedResponses: 0,
          emailNotifications: false,
          browserNotifications: true,
        });
        volunteer.save(function(err) {
          if (err) res.send(err);
          res.json({ message: 'Volunteer created' });
        });
      } else {
        res.json({
          message: 'Volunteer not created - invalid email address'
        });
      }
    } else {
      res.json({
        message: 'Volunteer not created - need a email and password'
      });
    }
  })
  .get(function(req, res) {
    Volunteer.find(function(err, volunteers) {
      if (err) res.send(err);
      res.json(volunteers);
    });
  });

api.route('/volunteers/:vol_id')
  .get(function(req, res) {
    Volunteer.findById(req.params.vol_id, function(err, volunteer) {
      if (err) res.send(err);
      res.json(volunteer);
    });
  })
  .put(function(req, res) {
    Volunteer.findById(req.params.vol_id, function(err, volunteer) {
      if (err) res.send(err);
      if (isVar(req.body.email)) {
        if (validateEmail(req.body.email)) {
          volunteer.email = req.body.email;
        } else {
          res.json({ message: 'Invalid email address' });
          return;
        }
      }
      if (isVar(req.body.emailNotifications)) {
        volunteer.emailNotifications = req.body.emailNotifications;
      }
      if (isVar(req.body.browserNotifications)) {
        volunteer.browserNotifications = req.body.browserNotifications;
      }
      volunteer.lastLogin = Date.now();
      volunteer.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Volunteer updated' });
      });
    });
  })
  .delete(function(req, res) {
    Volunteer.remove({
      _id: req.params.vol_id
    }, function(err, volunteer) {
      if (err) res.send(err);
      res.json({ message: 'Removed volunteer' });
    });
  })

//______________________________________________________________________________
// API - BVI user Section
api.route('/bviUsers')
  .post(function(req, res) {
    var bviUser = new BviUser();
    if (isVar(req.body.email) && isVar(req.body.pwd)) {
      if (validateEmail(req.body.email)) {
        Object.assign(bviUser, {
          email: req.body.email,
          pwd: req.body.pwd, // TODO hashing etc...
          creationDate: Date.now(),
          lastLogin: Date.now(),
          emailVerified: false,
          submittedImages: 0,
          acceptedResponses: 0,
          emailNotifications: true,
        });
        bviUser.save(function(err) {
          if (err) res.send(err);
          res.json({ message: 'BVI User created' });
        });
      } else {
        res.json({
          message: 'BVI User not created - invalid email address'
        });
      }
    } else {
      res.json({
        message: 'BVI User not created - need a email and password'
      });
    }
  })
  .get(function(req, res) {
    BviUser.find(function(err, bviUsers) {
      if (err) res.send(err);
      res.json(bviUsers);
    });
  });

api.route('/bviUsers/:user_id')
  .get(function(req, res) {
    BviUser.findById(req.params.user_id, function(err, bviUser) {
      if (err) res.send(err);
      res.json(bviUser);
    });
  })
  .put(function(req, res) {
    BviUser.findById(req.params.user_id, function(err, bviUser) {
      if (err) res.send(err);
      if (isVar(req.body.email)) {
        if (validateEmail(req.body.email)) {
          bviUser.email = req.body.email;
        } else {
          res.json({ message: 'Invalid email address' });
          return;
        }
      }
      if (isVar(req.body.emailNotifications)) {
        bviUser.emailNotifications = req.body.emailNotifications;
      }
      bviUser.lastLogin = Date.now();
      bviUser.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'BviUser updated' });
      });
    });
  })
  .delete(function(req, res) {
    BviUser.remove({
      _id: req.params.user_id
    }, function(err, bviUser) {
      if (err) res.send(err);
      res.json({ message: 'Removed bviUser' });
    });
  })

//______________________________________________________________________________
// Bind to app
app.use('/api', api);


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

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
