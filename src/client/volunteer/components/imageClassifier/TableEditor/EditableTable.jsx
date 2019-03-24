import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import EditableTableCell from './EditableTableCell';

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusX: 0,
      focusY: 0,
      hasFocus: false,
    };
    this.moveFocus = this.moveFocus.bind(this);
  }

  moveFocus(dx, dy) {
    this.setState(({ focusX, focusY }) => {
      const newX = Math.max(
        0, Math.min(
          this.props.table.get(0).size - 1,
          focusX + dx,
        ),
      );
      const newY = Math.max(
        0, Math.min(
          this.props.table.size - 1,
          focusY + dy,
        ),
      );
      return { focusX: newX, focusY: newY };
    });
  }

  render() {
    const { table, hasHeaders, onChange } = this.props;
    const { hasFocus, focusX, focusY } = this.state;
    const tableHead = hasHeaders ? table.get(0) : List([]);
    const tableBody = hasHeaders ? table.slice(1, table.length) : table;

    return (
      <table
        tabIndex={hasFocus ? -1 : 0}
        onFocus={() => this.setState({ hasFocus: true })}
        onBlur={() => this.setState({ hasFocus: false })}
        className="iris-table-description iris-editable-table"
      >
        <thead>
          <tr>
            {tableHead.map(
              (v, j) => (
                <th key={j}>
                  <EditableTableCell
                    value={v}
                    onChange={newVal => onChange(
                      table.set(0, table.get(0).set(j, newVal)),
                    )}
                    onClick={() => this.setState({ focusX: j, focusY: 0 })}
                    onNavigateOut={this.moveFocus}
                    focused={hasFocus && (focusX === j && focusY === 0)}
                  />
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {tableBody.map(
            (row, i) => (
              <tr key={i}>
                {row.map(
                  (v, j) => {
                    const n = hasHeaders ? i + 1 : i;
                    return (
                      <td key={j}>
                        <EditableTableCell
                          value={v}
                          onChange={newVal => onChange(
                            table.set(
                              n, table.get(n).set(j, newVal),
                            ),
                          )}
                          onClick={() => this.setState({ focusY: n, focusX: j })}
                          focused={hasFocus && (focusX === j && focusY === n)}
                          onNavigateOut={this.moveFocus}
                        />
                      </td>
                    );
                  },
                ).toJS()}
              </tr>
            ),
          ).toJS()}
        </tbody>
      </table>
    );
  }
}

EditableTable.propTypes = {
  table: PropTypes.instanceOf(List).isRequired,
  hasHeaders: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditableTable;
