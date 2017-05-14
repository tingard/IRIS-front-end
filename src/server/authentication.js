/* eslint-disable no-console, no-param-reassign, array-callback-return,
  no-shadow, no-underscore-dangle */
const passportJWT = require('passport-jwt');

const config = require('./config');
const Volunteer = require('./models/volUsr');
const BviUser = require('./models/bviUsr');

const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret,
};
const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  // usually this would be a database call:
  // need to check if token is valid: find the user associated with it's ID.
  BviUser.findById(jwtPayload._doc._id, (err, bviUser) => {
    if (err) { // query has errored...
      console.log('☠️  [ERROR]:', err);
      next(null, false);
    } else if (bviUser !== null) { // we've found a bvi-user associated with this id
      console.log('👾\t--> bvi-user authenticated with json web token');
      next(null, bviUser);
    } else {
      Volunteer.findById(jwtPayload._doc._id, (err, volunteer) => {
        if (err) {
          console.log('☠️  [ERROR]:', err);
          next(null, false);
        } else {
          console.log('👾\t--> volunteer authenticated with json web token');
          next(null, volunteer);
        }
      });
    }
  });
});

module.exports = strategy;
