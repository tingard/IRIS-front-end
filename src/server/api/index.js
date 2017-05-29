/* eslint-disable no-console, no-param-reassign, array-callback-return,
  no-shadow, no-underscore-dangle */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const config = require('../config');
const Volunteer = require('./models/volUsr');
const BviUser = require('./models/bviUsr');

// helper functions
// function isVar(v) { return (typeof v !== 'undefined'); }
// function validateEmail(email) { return /\S+@\S+\.\S+/.test(email); }

// config
const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret,
};
// const saltRounds = 10;

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
api.post('/login/:utype', (req, res) => {
  // TODO: which type of user is logging in?
  let utype = null;
  console.log(req.params.utype === 'volunteer');
  if (req.params.utype === 'volunteer') utype = Volunteer;
  else if (req.params.utype === 'bviUser') utype = BviUser;
  else {
    res.json({ success: false, message: 'Could not login' });
    return;
  }
  utype.findOne(
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

// -----------------------------------------------------------------------------
// API - Volunteer creation, modification and deletion
api.use('/volunteers', require('./apiVolunteer'));

// -----------------------------------------------------------------------------
// API - BVI User creation, modification and deletion
// TODO: can I reuse code here?
api.use('/bviUsers', require('./apiBvi.js'));


// -----------------------------------------------------------------------------
// API - Image Section
// TODO: post to cloudinary using their api
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
