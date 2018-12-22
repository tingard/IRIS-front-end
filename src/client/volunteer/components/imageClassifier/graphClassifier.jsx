/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import IrisButton from '../../../common-resources/IrisButton';
import TableEditor from './TableEditor';
import '../../../common-resources/_IrisCheckbox.scss';

class GraphClassifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xAxis: false,
      xAxisValue: '',
      yAxis: false,
      yAxisValue: '',
      title: false,
      titleValue: '',
      table: false,
      tableValue: '',
      plotDescription: '',
    };
  }

  render() {
    return (
      <div className="w3-container card-panel-right-pane">
        <h3>What's present in this graph?</h3>
        <div className="w3-row w3-padding-16">
          <label className="switch" htmlFor="graph-classifier-x-axis">
            <span>X-axis label</span>
            <input
              id="graph-classifier-x-axis"
              className="iris-input iris-input__full-width"
              type="text"
              placeholder="What is the x-axis label? (if there is one)"
              value={this.state.xAxisValue}
              onChange={e => this.setState({
                xAxis: e.target.value.length > 0,
                xAxisValue: e.target.value,
              })}
            />
          </label>
        </div>
        <div className="w3-row w3-padding-16">
          <label className="switch" htmlFor="graph-classifier-y-axis">
            <span>Y-axis label</span>
            <input
              id="graph-classifier-y-axis"
              className="iris-input iris-input__full-width"
              type="text"
              placeholder="What is the y-axis label?"
              value={this.state.yAxisValue}
              onChange={e => this.setState({
                yAxis: e.target.value.length > 0,
                yAxisValue: e.target.value,
              })}
            />
          </label>
        </div>
        <div className="w3-row w3-padding-16">
          <label className="switch" htmlFor="graph-classifier-title">
            <span>Is there a title?</span>
            <input
              id="graph-classifier-title-input"
              className="iris-input iris-input__full-width"
              type="text"
              placeholder="What is the title?"
              value={this.state.titleValue}
              onChange={e => this.setState({
                title: e.target.value.length > 0,
                titleValue: e.target.value,
              })}
            />
          </label>
        </div>
        <div className="w3-row w3-padding-16">
          <label
            htmlFor="graph-classifier-table"
            className="iris-checkbox-container"
          >
            Use a table to describe this graph?
            <input
              type="checkbox"
              className="no-mouseflow"
              id="graph-classifier-table"
              checked={this.state.table}
              onChange={e => this.setState({ table: e.target.checked })}
            />
            <span className="iris-checkbox-checkmark" />
          </label>
          {this.state.table ? (
            <TableEditor onChange={tableValue => this.setState({ tableValue })} />
          ) : null}
        </div>
        <div className="w3-row w3-padding-16">
          <label className="switch" htmlFor="graph-classifier-about">
            <span>Describe the graph</span>
            <textarea
              ref={(r) => { this.textarea = r; }}
              id="graph-classifier-about"
              className="classifier-textarea"
              rows={5}
              value={this.state.plotDescription}
              style={{ resize: 'none' }}
              onChange={e => this.setState({ plotDescription: e.target.value })}
            />
          </label>
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
