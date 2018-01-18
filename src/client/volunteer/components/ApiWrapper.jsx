import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ApiWrapper = (props) => {
  if (props.messages.get('state').get('isStale') && !props.messages.get('state').get('isFetching')) {
    props.getMessages();
  }
  if (props.cards.get('isStale') && !props.cards.get('isFetching')) {
    props.getImages();
  }
  if (props.user.get('isStale') && !props.user.get('isFetching')) {
    props.getUserDetails();
  }
  return <div id="api-watcher">{props.children}</div>;
};

ApiWrapper.propTypes = {
  messages: ImmutablePropTypes.contains({
    isStale: PropTypes.bool,
    isFetching: PropTypes.bool,
  }),
  cards: ImmutablePropTypes.contains({
    isStale: PropTypes.bool,
    isFetching: PropTypes.bool,
  }),
  user: ImmutablePropTypes.contains({
    isStale: PropTypes.bool,
    isFetching: PropTypes.bool,
  }),
  getMessages: PropTypes.func,
  getImages: PropTypes.func,
  getUserDetails: PropTypes.func,
  children: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ],
  ).isRequired,
};

export default ApiWrapper;
