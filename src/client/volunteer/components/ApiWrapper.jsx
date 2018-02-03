import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

// watches for stale things and updates accordingly

class ApiWrapper extends React.Component {
  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/volunteer-service-worker.js')
        .then((swReg) => {
          console.log('Service Worker is registered', swReg);
          this.props.passSwRegistrationToAPI(swReg);
          this.props.subscribeToPushNotifications();
        })
        .catch((error) => {
          console.error('Service Worker Error', error);
        });
    }
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
    } else if (
      (Notification.permission !== 'denied' || Notification.permission === 'default') &&
      Notification.permission !== 'granted'
    ) {
      Notification.requestPermission((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          /* eslint-disable no-unused-vars */
          const notification = new Notification('This is what notifications look like!');
          this.props.subscribeToPushNotifications();
          /* eslint-enable no-unused-vars */
        }
      });
    }
  }
  render() {
    if (this.props.messages.get('state').get('isStale') && !this.props.messages.get('state').get('isFetching')) {
      this.props.getMessages();
    }
    if (this.props.cards.get('state').get('isStale') && !this.props.cards.get('state').get('isFetching')) {
      this.props.getImages();
    }
    if (this.props.user.get('state').get('isStale') && !this.props.user.get('state').get('isFetching')) {
      this.props.getUserDetails();
    }
    return <div id="api-watcher">{this.props.children}</div>;
  }
}

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
  passSwRegistrationToAPI: PropTypes.func,
  subscribeToPushNotifications: PropTypes.func,
  children: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ],
  ).isRequired,
};

export default ApiWrapper;
