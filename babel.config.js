// babel.config.js
module.exports = {
  presets: [
    // Our default preset
    'poi/babel',
    '@babel/env',
  ],
  plugins: [
    // This adds Hot Reloading support
    'react-hot-loader/babel',
  ],
};
