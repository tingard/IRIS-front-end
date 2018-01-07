import ClientAPI from 'grapheel-iris-client-api';

// -----------------------------------------------------------------------------
// List of all actions used in the volunteer app, could be broken into sub-files
// -----------------------------------------------------------------------------

// SECTION async action creation
const api = new ClientAPI();

// wrapper function that creates async fetch actions
const fetch = type => (
  // usage: dispatch(fetchedAction(imgObj))
  payload => (
    (dispatch) => {
      // make sure we have auth loaded in
      api.loadTokenFromStorage();
      // send the the request action (start loading spinners etc...)
      dispatch(type.sendRequest());
      // api.handle will return a Promise, chain to that promise and dispatch
      // appropriate action
      return api.handle(type, payload).then(
        res => dispatch(type.success(res)),
        err => dispatch(type.error(err)),
      );
    }
  )
);

// SECTION: User details fetching / setting
export const userDetails = {
  get: {
    name: 'GET_USER_DETAILS',
    sendRequest: () => ({ type: 'GET_USER_DETAILS_REQUEST' }),
    success: res => ({ type: 'GET_USER_DETAILS_SUCCESS', res }),
    failure: error => ({ type: 'GET_USER_DETAILS_FAILURE', error }),
  },
  set: {
    name: 'SET_USER_DETAILS',
    sendRequest: details => ({ type: 'SET_USER_DETAILS', details }),
    success: res => ({ type: 'SET_USER_DETAILS_SUCCESS', res }),
    failure: error => ({ type: 'SET_USER_DETAILS_FAILURE', error }),
  },
  changePassword: {
    name: 'CHANGE_PASSWORD',
    sendRequest: ({ oldPassword, newPassword }) => (
      { type: 'CHANGE_PASSWORD', pwds: { oldPassword, newPassword } }
    ),
    success: res => ({ type: 'CHANGE_PASSWORD_SUCCESS', res }),
    failure: error => ({ type: 'CHANGE_PASSWORD_ERROR', error }),
  },
};
export const getUserDetails = fetch(userDetails.get);
export const setUserDetails = fetch(userDetails.set);
export const changeUserPassword = fetch(userDetails.changePassword);

// SECTION: Image viewing / replying
export const images = {
  get: {
    name: 'GET_IMAGES',
    sendRequest: () => ({ type: 'GET_IMAGES' }),
    success: res => ({ type: 'GET_IMAGES_SUCCESS', res }),
    failure: error => ({ type: 'GET_IMAGES_FAILURE', error }),
  },
  reply: {
    name: 'REPLY_IMAGE',
    sendRequest: formData => ({ type: 'REPLY_IMAGE', formData }),
    success: res => ({ type: 'REPLY_IMAGE_SUCCESS', res }),
    failure: error => ({ type: 'REPLY_IMAGE_FAILURE', error }),
  },
};
export const getImages = fetch(images.get);
export const replyImage = fetch(images.reply);

// SECTION: Messaging
export const messages = {
  get: {
    name: 'GET_MESSAGES',
    sendRequest: () => ({ type: 'GET_MESSAGES' }),
    success: res => ({ type: 'GET_MESSAGES_SUCCESS', res }),
    failure: error => ({ type: 'GET_MESSAGES_FAILURE', error }),
  },
  send: {
    name: 'SEND_MESSAGE',
    sendRequest: message => ({ type: 'SEND_MESSAGE', message }),
    success: res => ({ type: 'SEND_MESSAGE_SUCCESS', res }),
    failure: error => ({ type: 'SEND_MESSAGE_FAILURE', error }),
  },
};
export const getMessages = fetch(messages.get);
export const sendMessage = fetch(messages.send);
