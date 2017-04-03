/* eslint-disable no-console, no-param-reassign, array-callback-return, no-shadow */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

const Volunteer = require('./models/vol-usr');
const BviUser = require('./models/bvi-usr');
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;

function isVar(v) { return (typeof v !== 'undefined'); }

function validateEmail(email) { return /\S+@\S+\.\S+/.test(email); }


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

mongoose.connect('mongodb://localhost:27017');
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const api = new express.Router();

api.get('/', (req, res) => {
  res.json({ message: 'welcome to the api!' });
});

api.post('/login', (req, res) => {
  Volunteer.findOne(
    { email: req.body.email },
    (err, user) => {
      if (err) res.send(err);
      if (!user) {
        res.json({
          success: false,
          message: 'Could not login (err0)',
        });
      } else if (user) {
        if (user.password !== req.body.password) {
          res.json({
            success: false,
            message: 'Could not login (err1)',
          });
        } else {
          const token = jwt.sign(user, app.get('superSecret'), {
            expiresInMinutes: 1440, // expires in 24 hours
            // TODO: link to IP address somehow?
          });
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Successfully logged in',
            token,
          });
        }
      }
    });
});
api.use((req, res, next) => {
  // TODO: handle authentication here
  console.log(`🤖  "recieved api connection, www.grapheel.com/api${req.url}"`);
  next();
});

// TODO: break these off into separate files?
// TODO: can these be organised in a more logical way?

// -----------------------------------------------------------------------------
// API - Volunteer creation, modification and deletion

api.route('/volunteers')
  .post((req, res) => {
    const volunteer = new Volunteer();
    if (isVar(req.body.email) && isVar(req.body.pwd)) {
      if (validateEmail(req.body.email)) {
        Object.assign(volunteer, {
          email: req.body.email,
          pwd: req.body.pwd, // TODO hashing etc...
          firstName: isVar(req.body.firstname) ? req.body.firstname : '',
          lastName: isVar(req.body.lastname) ? req.body.lastname : '',
          creationDate: Date.now(),
          lastLogin: Date.now(),
          emailVerified: false,
          acceptedResponses: 0,
          rejectedResponses: 0,
          emailNotifications: false,
          browserNotifications: true,
        });
        volunteer.save((err) => {
          if (err) res.send(err);
          res.json({ message: 'Volunteer created' });
        });
      } else {
        res.json({
          message: 'Volunteer not created - invalid email address',
        });
      }
    } else {
      res.json({
        message: 'Volunteer not created - need a email and password',
      });
    }
  })
  .get((req, res) => {
    Volunteer.find((err, volunteers) => {
      if (err) res.send(err);
      res.json(volunteers);
    });
  });

api.route('/volunteers/:vol_id')
  .get((req, res) => {
    Volunteer.findById(req.params.vol_id, (err, volunteer) => {
      if (err) res.send(err);
      res.json(volunteer);
    });
  })
  .put((req, res) => {
    Volunteer.findById(req.params.vol_id, (err, volunteer) => {
      if (err) res.send(err);
      if (isVar(req.body.email)) {
        if (validateEmail(req.body.email)) {
          volunteer.email = req.body.email;
        } else {
          res.json({ message: 'Invalid email address provided' });
          return;
        }
      }
      if (isVar(req.body.firstname)) volunteer.firstName = req.body.firstname;
      if (isVar(req.body.lastName)) volunteer.lastName = req.body.lastname;
      if (isVar(req.body.emailNotifications)) {
        volunteer.emailNotifications = req.body.emailNotifications;
      }
      if (isVar(req.body.browserNotifications)) {
        volunteer.browserNotifications = req.body.browserNotifications;
      }
      volunteer.lastLogin = Date.now();
      volunteer.save((err) => {
        if (err) res.send(err);
        res.json({ message: 'Volunteer updated' });
      });
    });
  })
  .delete((req, res) => {
    Volunteer.remove({
      _id: req.params.vol_id,
    }, (err) => {
      if (err) res.send(err);
      res.json({ message: 'Removed Volunteer' });
    });
  });

// -----------------------------------------------------------------------------
// API - BVI User creation, modification and deletion
api.route('/bviUsers')
  .post((req, res) => {
    const bviUser = new BviUser();
    if (isVar(req.body.email) && isVar(req.body.pwd)) {
      if (validateEmail(req.body.email)) {
        Object.assign(bviUser, {
          email: req.body.email,
          pwd: req.body.pwd, // TODO hashing etc...
          firstName: isVar(req.body.firstname) ? req.body.firstname : '',
          lastName: isVar(req.body.lastname) ? req.body.lastname : '',
          creationDate: Date.now(),
          lastLogin: Date.now(),
          emailVerified: false,
          submittedImages: 0,
          acceptedResponses: 0,
          emailNotifications: true,
        });
        bviUser.save((err) => {
          if (err) res.send(err);
          res.json({ message: 'BVI User created' });
        });
      } else {
        res.json({
          message: 'BVI User not created - invalid email address',
        });
      }
    } else {
      res.json({
        message: 'BVI User not created - need a email and password',
      });
    }
  })
  .get((req, res) => {
    BviUser.find((err, bviUsers) => {
      if (err) res.send(err);
      res.json(bviUsers);
    });
  });

api.route('/bviUsers/:user_id')
  .get((req, res) => {
    BviUser.findById(req.params.user_id, (err, bviUser) => {
      if (err) res.send(err);
      res.json(bviUser);
    });
  })
  .put((req, res) => {
    BviUser.findById(req.params.user_id, (err, bviUser) => {
      if (err) res.send(err);
      if (isVar(req.body.email)) {
        if (validateEmail(req.body.email)) {
          bviUser.email = req.body.email;
        } else {
          res.json({ message: 'Invalid email address provided' });
          return;
        }
      }
      if (isVar(req.body.firstname)) bviUser.firstName = req.body.firstname;
      if (isVar(req.body.lastName)) bviUser.lastName = req.body.lastname;
      if (isVar(req.body.emailNotifications)) {
        bviUser.emailNotifications = req.body.emailNotifications;
      }
      bviUser.lastLogin = Date.now();
      bviUser.save((err) => {
        if (err) res.send(err);
        res.json({ message: 'BVI User updated' });
      });
    });
  })
  .delete((req, res) => {
    BviUser.remove({
      _id: req.params.user_id,
    }, (err) => {
      if (err) res.send(err);
      res.json({ message: 'Removed BVI User' });
    });
  });

// -----------------------------------------------------------------------------
// API - Image Section
api.route('/api/images')
  .get((req, res) => {
    res.json({ message: 'functionality not yet implemented' });
  })
  .post((req, res) => {
    // create a new image
    res.json({ message: 'functionality not yet implemented' });
  });

api.route('/api/images/:image_id')
  .get((req, res) => {
    // get an image (url, replies etc...)
    res.json({ message: 'functionality not yet implemented' });
  });

api.route('/api/volunteers/:vol_id/images');
api.route('/api/bviUsers/:user_id/images');
// multiple/combined tags?
api.route('/api/images/tags/');
api.route('/api/images/tags/:tag');
api.route('/api/images/tags/:tag/levels/:level');

// -----------------------------------------------------------------------------
// API - Message Section
api.route('/api/:utype/:uid/messages'); // GET
api.route('/api/messages/:message_id'); // GET, DELETE, POST to reply

// -----------------------------------------------------------------------------
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
