import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import '../../common-resources/IrisButton';

const AcceptDescriptionPrompt = props => (
  <div className="w3-row w3-container">
    <p>
      If the volunteer has answered your question, please accept their response!
      This will close this conversation window.
    </p>
    <Link
      to={`/student/images/descriptions/${props.message.get('image').get('_id')}/${props.message.get('_id')}`}
      className="iris-button primary w3-margin-right"
    >
      Accept this description
    </Link>
    <Link
      to={`/student/images/descriptions/${props.message.get('image').get('_id')}`}
      className="w3-margin-right iris-button tertiary"
    >
      Descriptions of this image
    </Link>
    <Link to="/student/images" className="iris-button tertiary">
      Your images
    </Link>
  </div>
);

AcceptDescriptionPrompt.propTypes = {
  message: ImmutablePropTypes.contains({
    messages: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        message: PropTypes.string,
      }),
    ),
    image: ImmutablePropTypes.contains({
      url: PropTypes.string,
      note: PropTypes.string,
      question: PropTypes.string,
    }),
  }),
};

export default AcceptDescriptionPrompt;
