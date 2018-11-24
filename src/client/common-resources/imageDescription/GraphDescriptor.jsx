/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const GraphDescriptor = ({
  title, titleValue, xAxis, xAxisValue, yAxis, yAxisValue, table, tableValue, plotDescription,
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
      {/* <h3>Graph details:</h3> */}
      <table className="iris-table-description">
        <tbody>{graphInfoRows}</tbody>
      </table>
      {table ? [
        <h4 key="data-table-header">Description of data:</h4>,
        <table key="data-table" className="iris-table-description">
          <tbody dangerouslySetInnerHTML={{ __html: tableValue }} />
        </table>,
      ] : null}
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
  tableValue: PropTypes.string,
  plotDescription: PropTypes.string,
};

export default GraphDescriptor;
