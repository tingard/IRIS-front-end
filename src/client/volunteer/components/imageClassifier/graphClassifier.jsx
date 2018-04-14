import React from 'react';
import PropTypes from 'prop-types';
import IrisButton from '../../../commonResources/IrisButton';

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
      plotDescription: '',
    };
  }
  render() {
    return (
      <div className="w3-container card-panel-right-pane">
        <h3>What's present in this graph?</h3>
        <div className="w3-row w3-padding-16">
          <label className="switch" htmlFor="graph-classifier-x-axis">
            <span>X-axis</span>
            <input
              type="checkbox"
              className="grapheel-checkbox"
              id="graph-classifier-x-axis"
              checked={this.state.xAxis}
              onChange={e => this.setState({ xAxis: e.target.checked })}
            />
          </label>
          <input
            id="graph-classifier-x-axis-input"
            className="w3-input w3-border w3-round"
            type="text"
            disabled={!this.state.xAxis}
            placeholder="What is the x-axis label?"
            value={this.state.xAxisValue}
            onChange={e => this.setState({ xAxisValue: e.target.value })}
          />
        </div>
        <div className="w3-row w3-padding-16">
          <label className="switch" htmlFor="graph-classifier-y-axis">
            <span>Y-axis</span>
            <input
              type="checkbox"
              className="grapheel-checkbox"
              id="graph-classifier-y-axis"
              checked={this.state.yAxis}
              onChange={e => this.setState({ yAxis: e.target.checked })}
            />
          </label>
          <input
            id="graph-classifier-y-axis-input"
            className="w3-input w3-border w3-round"
            type="text"
            disabled={!this.state.yAxis}
            placeholder="What is the y-axis label?"
            value={this.state.yAxisValue}
            onChange={e => this.setState({ yAxisValue: e.target.value })}
          />
        </div>
        <div className="w3-row w3-padding-16">
          <label className="switch" htmlFor="graph-classifier-title">
            <span>Title</span>
            <input
              type="checkbox"
              className="grapheel-checkbox"
              id="graph-classifier-title"
              checked={this.state.title}
              onChange={e => this.setState({ title: e.target.checked })}
            />
          </label>
          <input
            id="graph-classifier-title-input"
            className="w3-input w3-border w3-round"
            type="text"
            disabled={!this.state.title}
            placeholder="What is the title?"
            value={this.state.titleValue}
            onChange={e => this.setState({ titleValue: e.target.value })}
          />
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
