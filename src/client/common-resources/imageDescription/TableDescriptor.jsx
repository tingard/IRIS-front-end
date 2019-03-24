/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import './_tableDescriptor.scss';

const TableDescriptor = ({ value, hasHeader }) => {
  const tableHead = hasHeader ? value.get(0) : List([]);
  const tableBody = hasHeader ? value.slice(1, value.length) : value;

  return (
    <table className="iris-table-description">
      <thead>
        <tr>
          {tableHead.map(
            (v, j) => (
              <th key={j}>
                {v}
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
                (v, j) => (
                  <td key={j}>
                    {v}
                  </td>
                ),
              ).toJS()}
            </tr>
          ),
        ).toJS()}
      </tbody>
    </table>
  );
};

TableDescriptor.propTypes = {
  value: PropTypes.object.isRequired,
  hasHeader: PropTypes.bool,
};

TableDescriptor.defaultProps = {
  hasHeader: false,
};

export default TableDescriptor;
