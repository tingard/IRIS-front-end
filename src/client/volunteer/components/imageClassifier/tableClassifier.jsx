/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import IrisButton from '../../../common-resources/IrisButton';
import TableEditor from './TableEditor';

class TableClassifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableValue: '',
    };
    this.inputs = [];
    this.inputVals = [];
  }

  render() {
    return (
      <div className="w3-container card-panel-right-pane">
        <TableEditor onChange={tableValue => this.setState({ tableValue })} />;
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

TableClassifier.propTypes = {
  onComplete: PropTypes.func,
  onCancel: PropTypes.func,
};

export default TableClassifier;
