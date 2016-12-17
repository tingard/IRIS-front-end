import React from 'react';

const TemplateSelectorButton = props => (
  <button
    className="w3-btn w3-ripple"
    onClick={props.clickFunction}
  >
    {props.children}
  </button>
);

TemplateSelectorButton.propTypes = {
  clickFunction: React.PropTypes.func.isRequired,
  children: React.PropTypes.string,
};

export default TemplateSelectorButton;
