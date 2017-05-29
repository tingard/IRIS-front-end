/* eslint-disable no-console, no-param-reassign, array-callback-return,
  no-shadow, no-underscore-dangle */
const express = require('express');
const passport = require('passport');

const commonFuncs = require('./commonFunctions'); // TODO: this
const Volunteer = require('./models/volUsr');

function isVar(v) { return (typeof v !== 'undefined'); }
function validateEmail(email) { return /\S+@\S+\.\S+/.test(email); }

const apiRouter = new express.Router();

apiRouter.post('/', commonFuncs.registerUser(Volunteer));

apiRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // GET the currently authenticated volunteer
  console.log(req.user);
  Volunteer.findById(req.user._id, (err, volunteer) => {
    if (err) res.send(err);
    res.json({
      lastName: volunteer.lastName,
      firstName: volunteer.firstName,
      email: volunteer.email,
    });
  });
});

// TODO: this is insecure
apiRouter.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // GET a user with a specific ID
  Volunteer.findById(req.params.id, (err, volunteer) => {
    if (err) res.send(err);
    res.json({
      lastName: volunteer.lastName,
      firstName: volunteer.firstName,
      email: volunteer.email,
    });
  });
});

apiRouter.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Update a user
  // TODO: special permissions needed
  Volunteer.findById(req.params.id, (err, volunteer) => {
    if (err) res.send(err);
    if (isVar(req.body.email)) {
      if (validateEmail(req.body.email)) {
        volunteer.email = req.body.email;
      } else {
        res.json({ success: false, message: 'Invalid email address provided' });
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
      res.json({ success: true, message: 'Volunteer updated' });
    });
  });
});

apiRouter.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // TODO: special permissions needed
  Volunteer.remove({
    _id: req.params.id,
  }, (err) => {
    if (err) res.send(err);
    res.json({ message: 'Removed Volunteer' });
  });
});

module.exports = apiRouter;
