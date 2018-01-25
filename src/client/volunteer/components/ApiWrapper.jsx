import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

// watches for stale things and updates accordingly
const ApiWrapper = (props) => {
  // register the service worker here? componentDidMount better?
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/volunteer-service-worker.js');
  }
  if (props.messages.get('state').get('isStale') && !props.messages.get('state').get('isFetching')) {
    props.getMessages();
  }
  if (props.cards.get('state').get('isStale') && !props.cards.get('state').get('isFetching')) {
    props.getImages();
  }
  if (props.user.get('state').get('isStale') && !props.user.get('state').get('isFetching')) {
    props.getUserDetails();
  }
  return <div id="api-watcher">{props.children}</div>;
};

ApiWrapper.propTypes = {
  messages: ImmutablePropTypes.contains({
    state: ImmutablePropTypes.contains({
      isStale: PropTypes.bool,
      isFetching: PropTypes.bool,
    }),
  }),
  cards: ImmutablePropTypes.contains({
    state: ImmutablePropTypes.contains({
      isStale: PropTypes.bool,
      isFetching: PropTypes.bool,
    }),
  }),
  user: ImmutablePropTypes.contains({
    state: ImmutablePropTypes.contains({
      isStale: PropTypes.bool,
      isFetching: PropTypes.bool,
    }),
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
