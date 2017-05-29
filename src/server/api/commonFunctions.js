/* eslint-disable no-console, no-param-reassign, array-callback-return,
  no-shadow, no-underscore-dangle */
const bcrypt = require('bcryptjs');

const config = require('../config');

// helper functions
function isVar(v) { return (typeof v !== 'undefined'); }
function validateEmail(email) { return /\S+@\S+\.\S+/.test(email); }

module.exports = {
  registerUser: Utype => (req, res) => {
    if (!isVar(req.body.firstName) || !isVar(req.body.lastName) ||
        !isVar(req.body.email) || !isVar(req.body.pwd)) {
      res.json({
        success: false,
        message: 'User not created - not enough details provided',
      });
    } else {
      const user = new Utype();
      if (isVar(req.body.email) && isVar(req.body.pwd)) {
        if (validateEmail(req.body.email)) {
          if (req.body.pwd.length > 0) {
            bcrypt.genSalt(config.saltRounds, (err, salt) => {
              bcrypt.hash(req.body.pwd, salt, (err, hash) => {
                if (!err) {
                  user.setDefaults();
                  Object.assign(user, {
                    email: req.body.email,
                    pwd: hash,
                    firstName: isVar(req.body.firstName) ? req.body.firstName : '',
                    lastName: isVar(req.body.lastName) ? req.body.lastName : '',
                  });
                  user.save((err) => {
                    if (err) res.send(err);
                    res.json({ success: true, message: 'User created' });
                  });
                }
              });
            });
          }
        } else {
          res.json({
            success: false,
            message: 'User not created - invalid email address',
          });
        }
      } else {
        res.json({
          success: false,
          message: 'User not created - need a email and password',
        });
      }
    }
  },
  updateUser: () => {},
};
