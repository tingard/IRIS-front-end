import React from 'react';
import PropTypes from 'prop-types';

// watches for stale things and updates accordingly

class ApiWrapper extends React.Component {
  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/volunteer/service-worker.bundle.js')
        .then((swReg) => {
          this.props.passSwRegistrationToAPI(swReg);
          this.props.subscribeToPushNotifications();
        })
        .catch((error) => {
          console.error('Service Worker Error', error);
        });
      this.timers = {};
    }
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
    } else if (
      this.props.user.browserNotifications
      && (Notification.permission !== 'denied' || Notification.permission === 'default')
      && Notification.permission !== 'granted'
    ) {
      Notification.requestPermission((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          /* eslint-disable no-unused-vars */
          // const notification = new Notification('This is what notifications look like!');
          this.props.subscribeToPushNotifications();
          /* eslint-enable no-unused-vars */
        }
      });
    }
    if ('Pusher' in window) {
      const pusherKey = window.location.host === 'iris.grapheel.com'
        ? 'd8237a6f562be62749ed' : '594d0f4f3d9849505782';
      const pusher = new Pusher(pusherKey, {
        cluster: 'eu',
        forceTLS: true,
      });

      const channel = pusher.subscribe('iris-updates');
      // TODO: send just the image object across, rather than re-requesting the entire list?
      channel.bind('new-image', () => {
        this.props.getImages();
      });
      // TODO: don't ask for every message to be re-fetched whenever anyone does anything on IRIS!
      // payload could be a hashed version of the target email / user id?
      channel.bind('new-message', () => {
        this.props.getMessages();
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
  messages: PropTypes.shape({
    get: PropTypes.func.isRequired,
    state: PropTypes.shape({
      isStale: PropTypes.bool,
      isFetching: PropTypes.bool,
    }),
  }),
  cards: PropTypes.shape({
    get: PropTypes.func.isRequired,
    state: PropTypes.shape({
      isStale: PropTypes.bool,
      isFetching: PropTypes.bool,
    }),
  }),
  user: PropTypes.shape({
    get: PropTypes.func.isRequired,
    state: PropTypes.shape({
      isStale: PropTypes.bool,
      isFetching: PropTypes.bool,
    }),
    browserNotifications: PropTypes.bool,
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
