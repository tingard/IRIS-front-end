import React from 'react';
import PropTypes from 'prop-types';

const LinkExpiredAlert = ({ onClose }) => (
  <div
    className={'w3-panel w3-border w3-round ' +
      'w3-border-red w3-animate-right w3-display-container'}
    aria-describedby="successful-reset-alert"
  >
    <h2 id="successful-reset-alert">
      Invalid password reset link!
    </h2>
    <p>
      Whoops, this link has expired or already been used!
    </p>
    <p>
      Click <a href="/forgotten" rel="nofollow">here</a> to request a new one.
    </p>
    <button
      className="w3-display-topright w3-button"
      onClick={onClose}
      aria-label="Close"
    >
      x
    </button>
  </div>
);

LinkExpiredAlert.propTypes = {
  onClose: PropTypes.func,
};

export default LinkExpiredAlert;
