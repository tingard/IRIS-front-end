import React from 'react';
import PropTypes from 'prop-types';

const SuccessfulPasswordResetAlert = ({ onClose }) => (
  <div
    className={'w3-panel w3-border w3-round ' +
      'w3-border-green w3-animate-right w3-display-container'}
    aria-describedby="successful-reset-alert"
  >
    <p id="successful-reset-alert">
      Succesfully set new password!
    </p>
    <p>
      Click <a href="/" rel="nofollow">here</a> to go to the login page!
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

SuccessfulPasswordResetAlert.propTypes = {
  onClose: PropTypes.func,
};
export default SuccessfulPasswordResetAlert;
