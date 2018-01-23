import React from 'react';
import PropTypes from 'prop-types';

const IconCircle = props => (
  <circle
    r="57.074402"
    cy="86.089287"
    cx="90.336311"
    id="path21"
    className={`iconCircle ${props.className}`}
    filter="url(#iris-svg-shadow)"
    style={{ strokeWidth: 0.3444145 }}
  />
);

IconCircle.propTypes = {
  className: PropTypes.string,
};

IconCircle.defaultProps = {
  className: '',
};

export default IconCircle;
