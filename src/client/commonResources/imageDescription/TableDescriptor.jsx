import React from 'react';
import PropTypes from 'prop-types';

const GraphDescriptor = props => (
  <React.Fragment>
    <h4>Table details:</h4>
    <table className="iris-table-description" dangerouslySetInnerHTML={{ __html: props.value }} />
  </React.Fragment>
);

GraphDescriptor.propTypes = {
  value: PropTypes.string,
};

export default GraphDescriptor;
