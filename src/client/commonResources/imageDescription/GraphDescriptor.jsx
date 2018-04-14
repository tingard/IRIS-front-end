import React from 'react';
import PropTypes from 'prop-types';

const GraphDescriptor = (props) => {
  const rows = [];
  if (props.title) {
    rows.push(<tr key="graph-title"><td><p>Title</p></td><td><p>{props.titleValue}</p></td></tr>);
  }
  if (props.xAxis) {
    rows.push(<tr key="graph-xaxis"><td><p>X-axis</p></td><td><p>{props.xAxisValue}</p></td></tr>);
  }
  if (props.yAxis) {
    rows.push(<tr key="graph-yaxis"><td><p>Y-Axis</p></td><td><p>{props.yAxisValue}</p></td></tr>);
  }
  return (
    <React.Fragment>
      <h4>Graph details:</h4>
      <table className="iris-table-description">
        {rows}
      </table>
      <p>
        {props.plotDescription.length > 0 ? ` ${props.plotDescription}` : ''}
      </p>
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
  plotDescription: PropTypes.string,
};

export default GraphDescriptor;
