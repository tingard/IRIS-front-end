/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import IrisButton from '../../../common-resources/IrisButton';

class GraphClassifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  render() {
    return (
      <div className="w3-container card-panel-right-pane">
        <h3>Type in your description below:</h3>
        <div className="w3-row w3-padding-16">
          <textarea
            ref={(r) => { this.textarea = r; }}
            className="classifier-textarea"
            rows={10}
            style={{ resize: 'none' }}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </div>
        <IrisButton
          className="w3-bar w3-margin-top"
          onClick={() => this.props.onComplete(this.state)}
          type="primary"
          text="Finish"
        />
        <IrisButton
          className="w3-margin-top w3-margin-bottom"
          onClick={() => this.props.onCancel()}
          type="tertiary"
          text="Go back"
        />
      </div>
    );
  }
}

GraphClassifier.propTypes = {
  onComplete: PropTypes.func,
  onCancel: PropTypes.func,
};

export default GraphClassifier;
