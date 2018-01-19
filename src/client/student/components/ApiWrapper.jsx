import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

// watches for stale things and updates accordingly
const ApiWrapper = (props) => {
  if (props.messages.get('state').get('isStale') && !props.messages.get('state').get('isFetching')) {
    props.getMessages();
  }
  if (props.images.get('state').get('isStale') && !props.images.get('state').get('isFetching')) {
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
  images: ImmutablePropTypes.contains({
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
