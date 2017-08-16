/* eslint-disable no-console, no-param-reassign, array-callback-return,
  no-shadow, no-underscore-dangle */
const express = require('express');
const passport = require('passport');

const commonFuncs = require('./commonFunctions'); // TODO: this
const BviUser = require('./models/bviUsr');

function isVar(v) { return (typeof v !== 'undefined'); }
function validateEmail(email) { return /\S+@\S+\.\S+/.test(email); }

const apiRouter = new express.Router();

// TODO: put middleware for BVI user here

apiRouter.post(commonFuncs.registerUser(BviUser));

apiRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  BviUser.find((err, bviUser) => {
    if (err) res.send(err);
    res.json(bviUser);
  });
});

apiRouter.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  BviUser.findById(req.params.id, (err, bviUser) => {
    if (err) res.send(err);
    res.json(bviUser);
  });
});

apiRouter.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // TODO: this could be a commonFunc
  BviUser.findById(req.params.id, (err, bviUser) => {
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
});

apiRouter.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  BviUser.remove({
    _id: req.params.id,
  }, (err) => {
    if (err) res.send(err);
    res.json({ message: 'Removed BVI User' });
  });
});

module.exports = apiRouter;
