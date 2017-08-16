import React from 'react';
import PropTypes from 'prop-types';

const TemplateSelectorButton = props => (
  <button
    className="w3-btn w3-ripple"
    onClick={props.clickFunction}
  >
    {props.children}
  </button>
);

TemplateSelectorButton.propTypes = {
  clickFunction: PropTypes.func.isRequired,
  children: PropTypes.string,
};

export default TemplateSelectorButton;
