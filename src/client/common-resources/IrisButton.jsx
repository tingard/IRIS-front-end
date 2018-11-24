import React from 'react';
import PropTypes from 'prop-types';
import './_IrisButton.scss';

const IrisButton = ({
  text, disabled, type, onClick, className,
}) => (
  <button
    className={`iris-button ${type} ${className}`}
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

IrisButton.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

IrisButton.defaultProps = {
  type: 'primary',
  disabled: false,
  className: '',
  onClick: () => { console.log('button clicked'); },
};

export default IrisButton;
