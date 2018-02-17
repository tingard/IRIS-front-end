import React from 'react';
import PropTypes from 'prop-types';

const NotRegisteredUserAlert = ({ onClose }) => (
  <div
    className={'w3-panel w3-border w3-round ' +
      'w3-border-red w3-animate-right w3-display-container'}
    aria-describedby="invalid-email-alert"
  >
    <p id="invalid-email-alert">
      This email is not registered on IRIS for this user type
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

NotRegisteredUserAlert.propTypes = {
  onClose: PropTypes.func,
};

export default NotRegisteredUserAlert;
