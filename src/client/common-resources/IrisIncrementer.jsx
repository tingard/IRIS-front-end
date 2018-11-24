import React from 'react';
import PropTypes from 'prop-types';
import './_IrisIncrementer.scss';

const Incrementer = ({ onDecrease, onIncrease }) => (
  <div className="iris-incrementer">
    <button
      className="decrease"
      aria-label="decrease"
      type="button"
      onClick={onDecrease}
    >
-
    </button>
    <button
      className="increase"
      aria-label="increase"
      type="button"
      onClick={onIncrease}
    >
+
    </button>
  </div>
);

Incrementer.propTypes = {
  onDecrease: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
};

export default Incrementer;
