import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IrisButton from '../../common-resources/IrisButton';

const ImageDetails = (props) => {
  const nReplies = props.image.get('classifications').size;
  return (
    <React.Fragment>
      <img src={props.image.get('url')} alt={props.image.get('note')} />
      <div>
        <p>Question: {props.image.get('question')}</p>
        <IrisButton
          text={`See ${nReplies} ${nReplies === 1 ? 'reply' : 'replies'}`}
          type="primary"
          disabled={nReplies < 1}
          onClick={() => props.history.push(
            `/licence-owner/images/${props.image.get('_id')}`,
          )}
        />
      </div>
    </React.Fragment>
  );
};

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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ImageDetails;
