import React from 'react';
import PropTypes from 'prop-types';

const ImageCard = props => (
  <div className={`grapheel-image-card w3-card-4 ${props.tag}-card`}>
    <div className="image-card-level">
      <span className={`user-level-${props.user.level[props.tag] > props.level ? 'above' : 'below'}`}>
        {props.level}
      </span>
    </div>
    <div className="image-card-image-wrapper">
      <div
        className="image-card-image"
        style={{ backgroundImage: `url(${props.imageUrl})` }}
        alt=""
      />
    </div>
    <div className="image-card-message">
      {props.message.length > 60 ? `${props.message.slice(0, 50)}...` : props.message}
    </div>
  </div>
);

ImageCard.propTypes = {
  message: PropTypes.string,
  imageUrl: PropTypes.string,
  tag: PropTypes.string,
  level: PropTypes.number,
  user: PropTypes.object,
};

export default ImageCard;
