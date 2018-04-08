import React from 'react';
import PropTypes from 'prop-types';
import IrisButton from '../../../commonResources/IrisButton';

const ImageTypeSelector = props => (
  <div className="w3-container card-panel-right-pane">
    <h4 className="w3-margin-bottom">This would best be described</h4>
    <IrisButton
      className="w3-bar w3-margin-top w3-margin-bottom"
      onClick={() => props.onSelect('graph')}
      type="primary"
      text="As a graph"
    />
    <IrisButton
      className="w3-bar w3-margin-top w3-margin-bottom"
      onClick={() => props.onSelect('table')}
      type="primary"
      text="Using a table"
    />
    <IrisButton
      className="w3-bar w3-margin-top w3-margin-bottom"
      onClick={() => props.onSelect('other')}
      type="secondary"
      text="Some other way"
    />
  </div>
);

ImageTypeSelector.propTypes = {
  onSelect: PropTypes.func,
};

export default ImageTypeSelector;
