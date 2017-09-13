import React from 'react';
import PropTypes from 'prop-types';

const ImageCard = props => (
  <div className="grapheel-image-card w3-card-4">{props.message}</div>
);

ImageCard.propTypes = {
  message: PropTypes.string,
};

export default ImageCard;
