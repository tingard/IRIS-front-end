import React from 'react';
import PropTypes from 'prop-types';

const IrisAlert = props => (
  <div
    className={`iris-alert ${props.type} w3-display-container`}
    role="alert"
    aria-label={props.title}
  >
    <button
      onClick={props.onClose}
      aria-label="close"
      className="w3-button w3-medium w3-display-topright"
    >
      &times;
    </button>
    <h3>{props.title}</h3>
    <p>{props.message}</p>
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
