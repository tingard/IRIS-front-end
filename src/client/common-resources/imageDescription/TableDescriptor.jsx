/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import './_tableDescriptor.scss';

const GraphDescriptor = ({ value }) => (
  <React.Fragment>
    <h3>Table details:</h3>
    <table className="iris_table_description" dangerouslySetInnerHTML={{ __html: value }} />
  </React.Fragment>
);

GraphDescriptor.propTypes = {
  value: PropTypes.string,
};

export default GraphDescriptor;
