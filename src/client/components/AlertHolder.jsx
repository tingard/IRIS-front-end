import React from 'react';
import PropTypes from 'prop-types';

const AlertHolder = props => (
  <div className={`w3-panel ${props.type} w3-display-container`}>
    <button
      onClick={() => { this.parentElement.style.display = 'none'; }}
      className="w3-button w3-medium w3-display-topright"
    >
      &times;
    </button>
    <h3>{props.title}</h3>
    <p>{props.message}</p>
  </div>
);

AlertHolder.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default AlertHolder;
