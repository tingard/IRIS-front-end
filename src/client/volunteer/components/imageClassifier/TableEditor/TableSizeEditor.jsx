import React from 'react';
import PropTypes from 'prop-types';
import IrisIncrementer from '../../../../common-resources/IrisIncrementer';

const TableSizeEditor = ({ nRows, nCols, onChange }) => (
  <React.Fragment>
    <div className="w3-row w3-margin-bottom">
      <span>Number of columns:</span>
      <IrisIncrementer
        onDecrease={() => onChange({ nCols: Math.max(1, nCols - 1), nRows })}
        onIncrease={() => onChange({ nCols: nCols + 1, nRows })}
      />
    </div>
    <div className="w3-row w3-margin-bottom">
      <span>Number of rows:</span>
      <IrisIncrementer
        onDecrease={() => onChange({ nCols, nRows: Math.max(1, nRows - 1) })}
        onIncrease={() => onChange({ nCols, nRows: nRows + 1 })}
      />
    </div>
  </React.Fragment>
);

TableSizeEditor.propTypes = {
  nRows: PropTypes.number.isRequired,
  nCols: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TableSizeEditor;
