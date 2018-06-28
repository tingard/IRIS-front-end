import React from 'react';
import PropTypes from 'prop-types';

const IrisButton = props => (
  <button
    className={`iris-button ${props.type} ${props.className}`}
    onClick={props.onClick}
    disabled={props.disabled}
    aria-label={props['aria-label'] || ''}
  >
    {props.text}
  </button>
);

IrisButton.propTypes = {
  text: PropTypes.string.isRequired,
  'aria-label': PropTypes.string,
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
