import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

// watches for stale things and updates accordingly

class ApiWrapper extends React.Component {
  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/volunteer-service-worker.js')
        .then((swReg) => {
          this.props.passSwRegistrationToAPI(swReg);
          this.props.subscribeToPushNotifications();
        })
        .catch((error) => {
          console.error('Service Worker Error', error);
        });
      navigator.serviceWorker.addEventListener('message', (event) => {
        this.props.handlePushMessage(event.data);
      });
      this.timers = {};
    } else {
      // There is no service worker, do things the old fashioned way!
      console.log('No service workers allowed. Polling the API once a minute instead.');
      const getMessagesTimer = setInterval(1000 * 60, this.props.getMessages);
      const getImagesTimer = setInterval(1000 * 60, this.props.getImages);
      const getUserDetailsTimer = setInterval(1000 * 60, this.props.getUserDetails);
      this.timers = {
        getMessagesTimer,
        getImagesTimer,
        getUserDetailsTimer,
      };
    }
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
    } else if (
      this.props.user.browserNotifications &&
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
  componentWillUnmount() {
    Object.values(this.timers).map(t => clearInterval(t));
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
  handlePushMessage: PropTypes.func,
  children: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ],
  ).isRequired,
};

export default ApiWrapper;
