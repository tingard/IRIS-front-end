import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ImageDetails = props => (
  <li className="image-details-item">
    <img src={props.image.get('url')} alt={props.image.get('note')} />
    <p>{props.image.get('question')}</p>
    <p>{props.image.get('messages').shape} replies</p>
  </li>
);

ImageDetails.propTypes = {
  image: ImmutablePropTypes.contains({
    url: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    messages: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        classification: PropTypes.object,
      }),
    ),
  }),
};

export default ImageDetails;
