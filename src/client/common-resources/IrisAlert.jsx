import React from 'react';
import PropTypes from 'prop-types';
import './_IrisAlert.scss';

const IrisAlert = ({
  type, title, message, onClose,
}) => (
  <div
    className={`iris-alert ${type} w3-display-container`}
    role="alertdialog"
    aria-label={title}
  >
    <button
      onClick={onClose}
      type="button"
      aria-label="close"
      className="w3-button w3-medium w3-display-topright"
    >
      &times;
    </button>
    <h3 className="iris-alert-title">{title}</h3>
    <p className="iris-alert-message">{message}</p>
  </div>
);

IrisAlert.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

IrisAlert.defaultProps = {
  type: 'info',
};

export default IrisAlert;
