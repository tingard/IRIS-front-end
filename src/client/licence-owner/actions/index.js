import ClientAPI from 'grapheel-iris-client-api';
import {
  fetchWrapper,
  serviceWorker,
  userDetails,
  images,
  licences,
} from '../../actions';
// -----------------------------------------------------------------------------
// List of all actions used in the student app, could be broken into sub-files
// -----------------------------------------------------------------------------

// SECTION async action creation
const api = new ClientAPI();

// wrapper function that creates async fetch actions
const fetch = fetchWrapper(api);

// SECTION: User details fetching / setting
export const getUserDetails = fetch(userDetails.get);
export const setUserDetails = fetch(userDetails.set);
export const confirmEmail = fetch(userDetails.confirmEmail);
export const { dismissUpdateAlert } = userDetails;

export const changeUserPassword = fetch(userDetails.changePassword);
export const logout = fetch(userDetails.logout);

// SECTION: Images
export const getImages = fetch(images.get);

// SECTION: Licences
export const getLicences = fetch(licences.get);
export const updateLicences = fetch(licences.get);

// SECTION: Service worker
export const passSwRegistrationToAPI = fetch(serviceWorker.register);
export const subscribeToPushNotifications = fetch(serviceWorker.subscribe);
export const unsubscribeFromPushNotifications = fetch(serviceWorker.unsubscribe);

export const handlePushMessage = (msg) => {
  switch (msg.status) {
    case 'NEW_IMAGE':
      return getImages();
    default:
      return () => false;
  }
};
