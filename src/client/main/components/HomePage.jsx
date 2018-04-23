import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div id="iris-home-page" className="iris-narrow-page">
    <h1>Welcome to IRIS</h1>
    <p>This is going to be fun</p>
    <Link
      className="iris-button action"
      to="/login"
    >
      Login
    </Link>
  </div>
);

export default HomePage;
