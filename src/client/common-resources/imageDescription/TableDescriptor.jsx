/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const GraphDescriptor = props => (
  <React.Fragment>
    <h3>Table details:</h3>
    <table className="iris-table-description" dangerouslySetInnerHTML={{ __html: props.value }} />
  </React.Fragment>
);

GraphDescriptor.propTypes = {
  value: PropTypes.string,
};

export default GraphDescriptor;
