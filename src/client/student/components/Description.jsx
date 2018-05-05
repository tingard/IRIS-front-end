import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import moment from 'moment';

import ratingValues from '../../common-resources/ratingValues';
import ImageDescription from '../../common-resources/imageDescription';

const Description = (props) => {
  const m = props.messages.get(props.messages.size - 1);
  return (
    <div role="gridcell" aria-live="polite" className="w3-border-left w3-panel">
      <div role="group">
        <div className="w3-row">
          <ImageDescription classification={props.classification} />
        </div>
        <p className="mf-disable">
          {`Received ${moment(props.startDate).fromNow()}. ${
            props.messages.size > 1 ? (
              `This conversation has
                ${Math.max(props.messages.size - 1, 0)} ${props.messages.size > 2 ? 'messages.' : 'message.'}
                Most recent message
                ${moment(m.get('sendDate')).fromNow()}
              `
            ) : ''
          }`}
        </p>
        {props.markedAsCompleted ? (
          <p className="mf-disable">
            {`You accepted this message and rated the description
              ${ratingValues[props.rating].text}
            `}
          </p>
        ) : (
          <React.Fragment>
            <Link
              to={`/student/images/descriptions/${props.image.get('_id')}/${props._id}`}
              className="w3-margin-right iris-button primary"
            >
              Accept this description
            </Link>
            <Link
              to={`/student/messages/${props._id}`}
              className="w3-margin-right iris-button secondary"
            >
              {props.messages.size > 1 ? 'Read all messages in this conversation' : 'Ask a question about this description'}
            </Link>
          </React.Fragment>
        )}
        {props.markedAsCompleted && props.messages.size > 1 ? (
          <Link
            to={`/student/messages/${props._id}`}
            className="w3-margin-right iris-button secondary"
          >
            View the conversation for this image
          </Link>
        ) : null}
      </div>
    </div>
  );
};

Description.propTypes = {
  _id: PropTypes.string,
  messages: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      message: PropTypes.string,
    }),
  ),
  rating: PropTypes.number,
  image: ImmutablePropTypes.contains({
    _id: PropTypes.string,
  }),
  startDate: PropTypes.string,
  classification: PropTypes.shape({
    imageType: PropTypes.string,
  }),
  markedAsCompleted: PropTypes.bool,
};

export default Description;
