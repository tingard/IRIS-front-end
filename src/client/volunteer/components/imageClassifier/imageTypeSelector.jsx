import React from 'react';
import PropTypes from 'prop-types';
import IrisButton from '../../../common-resources/IrisButton';

const ImageTypeSelector = props => (
  <div className="w3-container card-panel-right-pane">
    <h4 className="w3-margin-bottom">Choose a template:</h4>
    <IrisButton
      className="w3-bar w3-margin-top w3-margin-bottom"
      onClick={() => props.onSelect('graph')}
      type="primary"
      text="Graph"
    />
    <IrisButton
      className="w3-bar w3-margin-top w3-margin-bottom"
      onClick={() => props.onSelect('table')}
      type="primary"
      text="Table"
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
