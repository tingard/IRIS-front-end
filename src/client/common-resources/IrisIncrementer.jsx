import React from 'react';
import PropTypes from 'prop-types';

const Incrementer = props => (
  <div className="iris-incrementer">
    <button
      className="decrease"
      aria-label="decrease"
      onClick={props.onDecrease}
    >-
    </button>
    <button
      className="increase"
      aria-label="increase"
      onClick={props.onIncrease}
    >+
    </button>
  </div>
);

Incrementer.propTypes = {
  onDecrease: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
};

export default Incrementer;
