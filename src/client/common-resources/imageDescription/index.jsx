import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GraphDescriptor from './GraphDescriptor';
import TableDescriptor from './TableDescriptor';

const ImageDescription = ({ classification }) => {
  switch (classification.get('imageType')) {
    case 'graph':
      return <GraphDescriptor {...classification.get('imageDetails').toObject()} />;
    case 'table':
      return <TableDescriptor {...classification.get('imageDetails').toObject()} />;
    case 'other':
      return (
        <React.Fragment>
          {/* <h3>Image Details</h3> */}
          {classification.get('imageDetails').get('value').length > 0
            ? classification.get('imageDetails').get('value').split(/\n/g).map(
              (paragraph, i) => <p key={i}>{paragraph}</p>,
            )
            : ''}
        </React.Fragment>
      );
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
