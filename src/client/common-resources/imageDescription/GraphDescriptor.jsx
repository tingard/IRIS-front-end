/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import TableDescriptor from './TableDescriptor';


const GraphDescriptor = ({
  title, titleValue, xAxis, xAxisValue, yAxis, yAxisValue,
  table, tableValue, tableHasHeaders, plotDescription,
}) => {
  const graphInfoRows = [];
  if (title) {
    graphInfoRows.push(
      <tr key="graph-title">
        <td><p>Title</p></td>
        <td><p>{titleValue}</p></td>
      </tr>,
    );
  }
  if (xAxis) {
    graphInfoRows.push(
      <tr key="graph-xaxis">
        <td><p>X-axis</p></td>
        <td><p>{xAxisValue}</p></td>
      </tr>,
    );
  }
  if (yAxis) {
    graphInfoRows.push(
      <tr key="graph-yaxis">
        <td><p>Y-Axis</p></td>
        <td><p>{yAxisValue}</p></td>
      </tr>,
    );
  }
  return (
    <React.Fragment>
      <table className="iris-table-description">
        <tbody>{graphInfoRows}</tbody>
      </table>
      {table ? (
        <React.Fragment>
          <h4 key="data-table-header">Description of data:</h4>
          {(typeof tableValue === 'string') ? (
            <table key="data-table" className="iris-table-description">
              <tbody dangerouslySetInnerHTML={{ __html: tableValue }} />
            </table>
          ) : (
            <TableDescriptor value={tableValue} hasHeader={tableHasHeaders} />
          )}
        </React.Fragment>
      ) : null}
      {plotDescription.length > 0
        ? plotDescription.split(/\n/g).map(
          (paragraph, i) => <p key={i}>{paragraph}</p>,
        )
        : ''}
    </React.Fragment>
  );
};

GraphDescriptor.propTypes = {
  xAxis: PropTypes.bool,
  xAxisValue: PropTypes.string,
  yAxis: PropTypes.bool,
  yAxisValue: PropTypes.string,
  title: PropTypes.bool,
  titleValue: PropTypes.string,
  table: PropTypes.bool,
  tableValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  tableHasHeaders: PropTypes.bool,
  plotDescription: PropTypes.string,
};

export default GraphDescriptor;
