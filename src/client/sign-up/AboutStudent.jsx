import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="w3-row w3-display-middle w3-animate-opacity">
    <h3>Great! Could you answer a few questions about yourself for us?</h3>
    <div className="w3-col m6">
      <label htmlFor="name-input" className="w3-right-align w3-margin-right">
        What's your name?
      </label>
    </div>
    <div className="w3-col m6">
      <input id="name-input" />
    </div>
    <Link to="/sign-up">Go Back</Link>
  </div>
);
