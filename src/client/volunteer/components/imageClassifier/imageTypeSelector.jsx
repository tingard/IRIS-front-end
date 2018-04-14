import React from 'react';
import PropTypes from 'prop-types';
import IrisButton from '../../../commonResources/IrisButton';

const ImageTypeSelector = props => (
  <div className="w3-container card-panel-right-pane">
    <h4 className="w3-margin-bottom">What template would you like to use?</h4>
    <IrisButton
      className="w3-bar w3-margin-top w3-margin-bottom"
      onClick={() => props.onSelect('graph')}
      type="primary"
      text="A graph"
    />
    <IrisButton
      className="w3-bar w3-margin-top w3-margin-bottom"
      onClick={() => props.onSelect('table')}
      type="primary"
      text="A table"
    />
    <IrisButton
      className="w3-bar w3-margin-top w3-margin-bottom"
      onClick={() => props.onSelect('other')}
      type="secondary"
      text="No template"
    />
  </div>
);

ImageTypeSelector.propTypes = {
  onSelect: PropTypes.func,
};

export default ImageTypeSelector;
