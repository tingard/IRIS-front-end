/* eslint-disable no-console, no-param-reassign, array-callback-return,
  no-shadow, no-underscore-dangle */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const config = require('./config');
const Volunteer = require('./models/volUsr');
const BviUser = require('./models/bviUsr');

// helper functions
function isVar(v) { return (typeof v !== 'undefined'); }
function validateEmail(email) { return /\S+@\S+\.\S+/.test(email); }

// config
const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret,
};
const saltRounds = 10;

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const api = new express.Router();

api.use((req, res, next) => {
  // TODO: could handle authentication here?
  console.log(`🤖  Recieved api connection \n\t${req.method}: www.grapheel.com/api${req.url}`);
  next();
});

api.get('/', (req, res) => {
  res.json({ message: 'welcome to the IRIS api! Please log in' });
});

// non-password protected route
api.post('/login', (req, res) => {
  // TODO: which type of user is logging in?
  Volunteer.findOne(
    { email: req.body.email },
    (err, user) => {
      if (err) res.send(err);
      if (!user) {
        res.json({
          success: false,
          message: 'Could not login',
        });
      } else if (user) {
        bcrypt.compare(req.body.pwd, user.pwd, (err2, res2) => {
          if (res2) {
            const token = jwt.sign(user, jwtOptions.secretOrKey, {
              // expires in 1 year TODO: drop this back before deployment
              // TODO: link to IP address somehow?
              expiresIn: '1y',
            });
            // return the information including token as JSON
            res.json({ success: true, message: 'Successfully logged in', token });
          } else {
            res.json({ success: false, message: 'Could not login' });
          }
        });
      }
    }
  );
});

// TODO: break these off into separate files?
// TODO: can these be organised in a more logical way?

// password protected routes
// -----------------------------------------------------------------------------
// API - Volunteer creation, modification and deletion

api.route('/volunteers')
  .post((req, res) => {
    const volunteer = new Volunteer();
    if (isVar(req.body.email) && isVar(req.body.pwd)) {
      if (validateEmail(req.body.email)) {
        if (req.body.pwd.length > 0) {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(req.body.pwd, salt, (err, hash) => {
              if (!err) {
                volunteer.setDefaults();
                Object.assign(volunteer, {
                  email: req.body.email,
                  pwd: hash,
                  firstName: isVar(req.body.firstname) ? req.body.firstname : '',
                  lastName: isVar(req.body.lastname) ? req.body.lastname : '',
                });
                volunteer.save((err) => {
                  if (err) res.send(err);
                  res.json({ message: 'Volunteer created' });
                });
              }
            });
          });
        }
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
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    Volunteer.find((err, volunteers) => {
      if (err) res.send(err);
      res.json(volunteers);
    });
  });

api.route('/volunteers/:vol_id')
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    Volunteer.findById(req.params.vol_id, (err, volunteer) => {
      if (err) res.send(err);
      res.json(volunteer);
    });
  })
  .put(passport.authenticate('jwt', { session: false }), (req, res) => {
    // TODO: special permissions needed
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
  .delete(passport.authenticate('jwt', { session: false }), (req, res) => {
    // TODO: special permissions needed
    Volunteer.remove({
      _id: req.params.vol_id,
    }, (err) => {
      if (err) res.send(err);
      res.json({ message: 'Removed Volunteer' });
    });
  });

// -----------------------------------------------------------------------------
// API - BVI User creation, modification and deletion
// TODO: can I reuse code here?
api.route('/bviUsers')
  .post(passport.authenticate('jwt', { session: false }), (req, res) => {
    const bviUser = new BviUser();
    if (isVar(req.body.email) && isVar(req.body.pwd)) {
      if (validateEmail(req.body.email)) {
        bviUser.setDefaults();
        Object.assign(bviUser, {
          email: req.body.email,
          pwd: req.body.pwd, // TODO hashing etc...
          firstName: isVar(req.body.firstname) ? req.body.firstname : '',
          lastName: isVar(req.body.lastname) ? req.body.lastname : '',
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
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    BviUser.find((err, bviUsers) => {
      if (err) res.send(err);
      res.json(bviUsers);
    });
  });

api.route('/bviUsers/:user_id')
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    BviUser.findById(req.params.user_id, (err, bviUser) => {
      if (err) res.send(err);
      res.json(bviUser);
    });
  })
  .put(passport.authenticate('jwt', { session: false }), (req, res) => {
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
  .delete(passport.authenticate('jwt', { session: false }), (req, res) => {
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
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    // get all images?
    res.json({ message: 'functionality not yet implemented' });
  })
  .post(passport.authenticate('jwt', { session: false }), (req, res) => {
    // create a new image
    res.json({ message: 'functionality not yet implemented' });
  });

api.route('/api/images/:image_id')
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    // get an image (url, replies etc...)
    res.json({ message: 'functionality not yet implemented' });
  });

api.route('/api/volunteers/:vol_id/images');
api.route('/api/bviUsers/:user_id/images');
// multiple/combined tags?
api.route('/api/images/tags/');
api.route('/api/images/tags/:tag');
api.route('/api/images/tags/:tag/levels/:level');
api.route('/api/images/levels/:level/tags/:tag');

// -----------------------------------------------------------------------------
// API - Message Section
api.route('/api/:utype/:uid/messages'); // GET
api.route('/api/:utype/:uid/messages/:message_id'); // GET, DELETE, POST to reply
api.route('/api/messages/:message_id'); // GET, DELETE, POST to reply

module.exports = api;
