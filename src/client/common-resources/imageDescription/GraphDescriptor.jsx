/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const GraphDescriptor = (props) => {
  const graphInfoRows = [];
  if (props.title) {
    graphInfoRows.push(
      <tr key="graph-title">
        <td><p>Title</p></td>
        <td><p>{props.titleValue}</p></td>
      </tr>,
    );
  }
  if (props.xAxis) {
    graphInfoRows.push(
      <tr key="graph-xaxis">
        <td><p>X-axis</p></td>
        <td><p>{props.xAxisValue}</p></td>
      </tr>,
    );
  }
  if (props.yAxis) {
    graphInfoRows.push(
      <tr key="graph-yaxis">
        <td><p>Y-Axis</p></td>
        <td><p>{props.yAxisValue}</p></td>
      </tr>,
    );
  }
  return (
    <React.Fragment>
      {/* <h3>Graph details:</h3> */}
      <table className="iris-table-description">
        <tbody>{graphInfoRows}</tbody>
      </table>
      {props.table ? [
        <h4 key="data-table-header">Description of data:</h4>,
        <table key="data-table" className="iris-table-description">
          <tbody dangerouslySetInnerHTML={{ __html: props.tableValue }} />
        </table>,
      ] : null}
      {props.plotDescription.length > 0 ?
        props.plotDescription.split(/\n/g).map(
          (paragraph, i) => <p key={i}>{paragraph}</p>,
        ) :
      ''}
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
