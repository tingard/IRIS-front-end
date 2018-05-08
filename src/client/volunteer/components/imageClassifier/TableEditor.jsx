import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import IrisIncrementer from '../../../common-resources/IrisIncrementer';

class TableEditor extends React.Component {
  constructor(props) {
    super(props);
    this.changeTableSize = this.changeTableSize.bind(this);
    this.changeTableRows = this.changeTableRows.bind(this);
    this.changeTableCols = this.changeTableCols.bind(this);
    let table = List([]);
    const nRows = 3;
    const nCols = 2;
    for (let i = 0; i < nRows; i += 1) {
      for (let j = 0; j < nCols; j += 1) {
        table = table.set((i * nCols) + j, '');
      }
    }
    this.state = {
      nRows, nCols, table, hasHeaders: true,
    };
  }
  changeTableRows(nRows) {
    this.changeTableSize(nRows, this.state.nCols);
  }
  changeTableCols(nCols) {
    this.changeTableSize(this.state.nRows, nCols);
  }
  changeTableSize(nRows, nCols) {
    let table = List();
    for (let i = 0; i < nRows; i += 1) {
      for (let j = 0; j < nCols; j += 1) {
        table = table.set(
          (i * nCols) + j,
          i < this.state.nRows && j < this.state.nCols ?
            this.state.table.get((i * this.state.nCols) + j) :
            '',
        );
      }
    }
    this.setState(
      { nRows, nCols, table },
      () => this.props.onChange(this.compileTable()),
    );
  }
  compileTable() {
    let rowN;
    let cell;
    let tag;
    const out = this.state.table.map(
      (value, i) => {
        tag = this.state.hasHeaders && i < this.state.nCols ? 'th' : 'td';
        rowN = i % this.state.nCols;
        cell = `<${tag}>${value || ''}</${tag}>`;
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
    const gridStyle = {
      gridTemplateColumns: 'minmax(80px, 1fr) '.repeat(this.state.nCols),
    };
    const table = [];
    for (let i = 0; i < this.state.nRows; i += 1) {
      for (let j = 0; j < this.state.nCols; j += 1) {
        table.push(
          <input
            type="text"
            key={`classifier-input-${i}.${j}`}
            className={this.state.hasHeaders && i === 0 ? 'header' : ''}
            value={this.state.table.get((i * this.state.nCols) + j)}
            onChange={e => this.setState(
              {
                table: this.state.table.set(
                  (() => (i * this.state.nCols) + j)(),
                  e.target.value,
                ),
              },
              () => this.props.onChange(this.compileTable()),
            )}
          />,
        );
      }
    }
    return (
      <div className="w3-row w3-padding-16 image-classifier-table-editor">
        <div className="w3-row w3-margin-bottom">
          <label htmlFor="classifier-table-column-picker">
            <span>Number of columns:</span>
            <IrisIncrementer
              onDecrease={() => this.changeTableCols(Math.max(1, this.state.nCols - 1))}
              onIncrease={() => this.changeTableCols(this.state.nCols + 1)}
            />
          </label>
        </div>
        <div className="w3-row w3-margin-bottom">
          <label htmlFor="classifier-table-row-picker">
            <span>Number of rows:</span>
            <IrisIncrementer
              onDecrease={() => this.changeTableRows(Math.max(1, this.state.nRows - 1))}
              onIncrease={() => this.changeTableRows(this.state.nRows + 1)}
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
          {table}
        </div>
      </div>
    );
  }
}

TableEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default TableEditor;
