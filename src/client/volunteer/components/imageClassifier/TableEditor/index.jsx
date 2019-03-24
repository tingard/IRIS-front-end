import React from 'react';
import PropTypes from 'prop-types';
import { List, fromJS } from 'immutable';
import TableSizeEditor from './TableSizeEditor';
import EditableTable from './EditableTable';
import './TableEditor.scss';

class TableEditor extends React.Component {
  constructor(props) {
    super(props);
    this.calculateTable = this.calculateTable.bind(this);
    const nRows = 5;
    const nCols = 2;
    const table = List([]);
    this.state = {
      table, nRows, nCols, hasHeaders: true,
    };
    this.state.table = this.calculateTable();
  }

  componentDidMount() {
    // provide initial state to the parent component
    this.props.onChange({
      table: this.state.table,
      hasHeaders: this.state.hasHeaders,
    });
  }

  calculateTable() {
    const { table, nRows, nCols } = this.state;
    let newTable = List([]);
    for (let i = 0; i < nRows; i += 1) {
      const row = [];
      for (let j = 0; j < nCols; j += 1) {
        row.push(table.get(i, List([])).get(j, ''));
      }
      newTable = newTable.set(i, fromJS(row));
    }
    return newTable;
  }

  render() {
    const {
      table, hasHeaders, nRows, nCols,
    } = this.state;
    return (
      <div className="w3-row w3-padding-16 image-classifier-table-editor">
        <TableSizeEditor
          nRows={nRows}
          nCols={nCols}
          onChange={newSize => this.setState(
            newSize,
            () => this.setState({ table: this.calculateTable() }),
          )}
        />
        <div className="w3-padding-16">
          <label
            htmlFor="table-classifier-header-checkbox"
            className="iris-checkbox-container"
          >
            Use table headers?
            <input
              type="checkbox"
              className="no-mouseflow"
              id="table-classifier-header-checkbox"
              checked={hasHeaders}
              onChange={e => this.setState(
                { hasHeaders: e.target.checked },
                () => this.props.onChange({
                  table: this.state.table,
                  hasHeaders: this.state.hasHeaders,
                }),
              )}
            />
            <span className="iris-checkbox-checkmark" />
          </label>
        </div>
        <EditableTable
          table={table}
          hasHeaders={hasHeaders}
          onChange={newTable => this.setState(
            { table: newTable },
            () => this.props.onChange({
              table: this.state.table,
              hasHeaders: this.state.hasHeaders,
            }),
          )}
        />
      </div>
    );
  }
}

TableEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default TableEditor;
