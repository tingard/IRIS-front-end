import ClientAPI from 'grapheel-iris-client-api';
import { fetchWrapper, serviceWorker, messages, userDetails, images } from '../../actions';

// -----------------------------------------------------------------------------
// List of all actions used in the volunteer app, could be broken into sub-files
// -----------------------------------------------------------------------------

// SECTION async action creation
// this is fine, as I'm loading the token user info from storage and not pinging
// the API unnecessarily (not calling api.init)
const api = new ClientAPI();

// wrapper function that creates async fetch actions
const fetch = fetchWrapper(api);

// SECTION: User details fetching / setting
export const getUserDetails = fetch(userDetails.get);
export const setUserDetails = fetch(userDetails.set);
export const changeUserPassword = fetch(userDetails.changePassword);
export const { dismissUpdateAlert } = userDetails;
export const logout = fetch(userDetails.logout);

// SECTION: Image viewing / replying
export const getImages = fetch(images.get);
export const replyImage = fetch(images.reply);

// SECTION: Messaging
export const getMessages = fetch(messages.get);
export const sendMessage = fetch(messages.send);

// SECTION: Service worker
export const passSwRegistrationToAPI = fetch(serviceWorker.register);
export const subscribeToPushNotifications = fetch(serviceWorker.subscribe);
export const unsubscribeFromPushNotifications = fetch(serviceWorker.unsubscribe);

export const handlePushMessage = (msg) => {
  switch (msg.status) {
    case 'NEW_MESSAGE':
      return getMessages();
    case 'NEW_IMAGE':
      return getImages();
    default:
      return () => false;
  }
};
