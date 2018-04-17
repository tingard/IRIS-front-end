export const get = {
  name: 'GET_MESSAGES',
  sendRequest: () => ({ type: 'GET_MESSAGES' }),
  success: res => ({ type: 'GET_MESSAGES_SUCCESS', res }),
  failure: error => ({ type: 'GET_MESSAGES_FAILURE', error }),
};
export const send = {
  name: 'SEND_MESSAGE',
  sendRequest: message => ({ type: 'SEND_MESSAGE', message }),
  success: res => ({ type: 'SEND_MESSAGE_SUCCESS', res }),
  failure: error => ({ type: 'SEND_MESSAGE_FAILURE', error }),
};
export const accept = {
  name: 'ACCEPT_MESSAGE',
  sendRequest: ({ messageId, rating }) => ({
    type: 'ACCEPT_MESSAGE',
    payload: { messageId, rating },
  }),
  success: res => ({ type: 'ACCEPT_MESSAGE_SUCCESS', res }),
  failure: error => ({ type: 'ACCEPT_MESSAGE_FAILURE', error }),
};
