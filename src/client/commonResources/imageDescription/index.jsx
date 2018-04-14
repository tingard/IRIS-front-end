import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GraphDescriptor from './GraphDescriptor';
import TableDescriptor from './TableDescriptor';

const ImageDescription = (props) => {
  switch (props.classification.get('imageType')) {
    case 'graph':
      return <GraphDescriptor {...props.classification.get('imageDetails').toObject()} />;
    case 'table':
      return <TableDescriptor {...props.classification.get('imageDetails').toObject()} />;
    case 'other':
      return <p>{props.classification.get('imageDetails').get('value')}</p>;
    default:
      return '';
  }
};

ImageDescription.propTypes = {
  classification: ImmutablePropTypes.contains({
    imageType: PropTypes.string,
    imageDetails: PropTypes.object,
  }),
};

export default ImageDescription;
