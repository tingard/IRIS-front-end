import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

// watches for stale things and updates accordingly
class ApiWrapper extends React.Component {
  componentDidMount() {
    // this.timers = [];
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('/licence-owner-service-worker.js')
    //     .then((swReg) => {
    //       this.props.passSwRegistrationToAPI(swReg);
    //       this.props.subscribeToPushNotifications();
    //     })
    //     .catch((error) => {
    //       console.error('Service Worker Error', error);
    //     });
    //   navigator.serviceWorker.addEventListener('message', (event) => {
    //     this.props.handlePushMessage(event.data);
    //   });
    // } else {
    //   // There is no service worker, do things the old fashioned way!
    //   console.log('No service workers allowed. Polling the API instead.');
    //   const getMessagesTimer = setInterval(this.props.getMessages, 1000 * 120);
    //   const getImagesTimer = setInterval(this.props.getImages, 1000 * 120);
    //   // TODO: should poll for user details?
    //   // const getUserDetailsTimer = setInterval(this.props.getUserDetails, 1000 * 60);
    //   this.timers = {
    //     getMessagesTimer,
    //     getImagesTimer,
    //     // getUserDetailsTimer,
    //   };
    // }
    // if (this.props.user.get('browserNotifications')) {
    //   if (!('Notification' in window)) {
    //     console.warn('This browser does not support desktop notification');
    //   } else if (
    //     (Notification.permission !== 'denied' || Notification.permission === 'default') &&
    //     Notification.permission !== 'granted'
    //   ) {
    //     Notification.requestPermission((permission) => {
    //       // If the user accepts, let's create a notification
    //       if (permission === 'granted') {
    //         /* eslint-disable no-unused-vars */
    //         const notification = new Notification('This is what notifications look like!');
    //         this.props.subscribeToPushNotifications();
    //         /* eslint-enable no-unused-vars */
    //       }
    //     });
    //   }
    // }
    console.log('ApiWrapper mounted');
    if (this.props.licences.get('state').get('isStale') && !this.props.licences.get('state').get('isFetching')) {
      this.props.getImages();
    }
    if (this.props.user.get('state').get('isStale') && !this.props.user.get('state').get('isFetching')) {
      this.props.getUserDetails();
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('hi there');
    const shouldFetch = state => state.get('isStale') && !state.get('isFetching');
    const licenceState = nextProps.licences.get('state');
    const userState = nextProps.user.get('state');
    const imagesState = nextProps.images.get('state');
    if (shouldFetch(licenceState)) {
      nextProps.getLicences();
    }
    if (shouldFetch(userState)) {
      nextProps.getUserDetails();
    }
    if (shouldFetch(imagesState)) {
      nextProps.getImages();
    }
  }
  componentWillUnmount() {
    // Object.keys(this.timers).map(key => clearInterval(this.timers[key]));
  }
  render() {
    return <div id="api-watcher">{this.props.children}</div>;
  }
}

ApiWrapper.propTypes = {
  licences: ImmutablePropTypes.contains({
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
  images: ImmutablePropTypes.contains({
    state: ImmutablePropTypes.contains({
      isStale: PropTypes.bool,
      isFetching: PropTypes.bool,
    }),
  }),
  // getMessages: PropTypes.func,
  getImages: PropTypes.func,
  getUserDetails: PropTypes.func,
  getLicences: PropTypes.func,
  // passSwRegistrationToAPI: PropTypes.func,
  // subscribeToPushNotifications: PropTypes.func,
  // handlePushMessage: PropTypes.func,
  children: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ],
  ).isRequired,
};

export default ApiWrapper;
