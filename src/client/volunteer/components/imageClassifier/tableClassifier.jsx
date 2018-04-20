/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import IrisButton from '../../../common-resources/IrisButton';

class GraphClassifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nCols: 2,
      nRows: 3,
      hasHeaders: true,
      foo: true,
    };
    this.inputs = [];
    this.inputVals = [];
  }
  componentWillUpdate(nextProps, nextState) {
    const oldVals = [];
    document.querySelectorAll('#image-classifier-table .table input').forEach(
      ipt => oldVals.push(ipt.value),
    );
    this.inputVals = [];
    let newIdx;
    oldVals.forEach(
      (val, i) => {
        newIdx = (Math.floor(i / this.state.nCols) * nextState.nCols) + (i % this.state.nCols);
        this.inputVals[newIdx] = val;
      },
    );
  }
  componentDidUpdate() {
    /* eslint-disable no-param-reassign */
    document.querySelectorAll('#image-classifier-table .table input').forEach(
      (ipt, i) => { ipt.value = this.inputVals[i] || ''; },
    );
    /* eslint-enable no-param-reassign */
  }
  compileTable() {
    const inputVals = [];
    document.querySelectorAll('#image-classifier-table .table input').forEach(
      ipt => inputVals.push(ipt.value),
    );
    let rowN;
    let cell;
    let tag;
    const out = inputVals.map(
      (value, i) => {
        tag = this.state.hasHeaders && i < this.state.nCols ? 'th' : 'td';
        rowN = i % this.state.nCols;
        cell = `<${tag}>${value}</${tag}>`;
        if (rowN === 0) {
          cell = `<tr>${cell}`;
          if (tag === 'th') {
            cell = `<thead>${cell}`;
          } else if (i === this.state.hasHeaders * this.state.nCols) {
            cell = `<tbody>${cell}`;
          }
        }
        if (rowN === this.state.nCols - 1) {
          cell = `${cell}</tr>`;
          if (tag === 'th') {
            cell = `${cell}</thead>`;
          }
        }
        return cell;
      },
    );
    return `${out.join('')}</tbody>`;
  }
  render() {
    console.log(this.inputVals);
    const gridStyle = {
      gridTemplateColumns: 'minmax(80px, 1fr) '.repeat(this.state.nCols),
    };
    this.inputs = [];
    for (let i = 0; i < this.state.nCols * this.state.nRows; i += 1) {
      if (this.state.hasHeaders && i < this.state.nCols) {
        this.inputs.push(
          <input
            type="text"
            key={`classifier-input-${i}`}
            className="header"
          />,
        );
      } else {
        this.inputs.push(
          <input
            type="text"
            key={`classifier-input-${i}`}
          />,
        );
      }
    }
    return (
      <div className="w3-container card-panel-right-pane">
        <h3>Construct your table:</h3>
        <div className="w3-row w3-padding-16" id="image-classifier-table">
          <div className="w3-row w3-margin-bottom">
            <label htmlFor="classifier-table-column-picker">
              <span>Number of columns:</span>
              <input
                type="number"
                className="w3-input w3-border w3-round table-size-picker"
                id="classifier-table-column-picker"
                min="1"
                max="5"
                value={this.state.nCols}
                onChange={e => this.setState({ nCols: e.target.value })}
              />
            </label>
          </div>
          <div className="w3-row w3-margin-bottom">
            <label htmlFor="classifier-table-row-picker">
              <span>Number of rows:</span>
              <input
                className="w3-input w3-border w3-round table-size-picker"
                id="classifier-table-row-picker"
                type="number"
                min="2"
                max="10"
                value={this.state.nRows}
                onChange={e => this.setState({ nRows: e.target.value })}
              />
            </label>
          </div>
          <div className="w3-row w3-margin-bottom">
            <label className="switch" htmlFor="table-classifier-header-checkbox">
              <span>Use table headers?</span>
              <input
                type="checkbox"
                className="grapheel-checkbox"
                id="table-classifier-header-checkbox"
                checked={this.state.hasHeaders}
                onChange={e => this.setState({ hasHeaders: e.target.checked })}
              />
            </label>
          </div>
          <div className="table" style={gridStyle}>
            {this.inputs}
          </div>
        </div>
        <IrisButton
          className="w3-bar w3-margin-top"
          onClick={() => this.props.onComplete({ value: this.compileTable() })}
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
