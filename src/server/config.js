/* eslint-disable global-require */
// Check if our process variables have been defined somewhere, if not import .env
// The most import variable is the path to the database, so use that as a reference
if (typeof process.env.PORT === 'undefined') {
  require('dotenv').config();
}
module.exports = {
  PORT: process.env.PORT || 5000,
  stripe: {
    publicKey: process.env.STRIPE_PUBLIC,
  },
};
