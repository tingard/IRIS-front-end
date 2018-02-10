export const register = {
  name: 'REGISTER_SERVICE_WORKER',
  sendRequest: swRegistration => ({ type: 'REGISTER_SERVICE_WORKER', swRegistration }),
  success: res => ({ type: 'REGISTER_SERVICE_WORKER_SUCCESS', res }),
  failure: error => ({ type: 'REGISTER_SERVICE_WORKER_FAILURE', error }),
};
export const subscribe = {
  name: 'SUBSCRIBE_TO_PUSH_NOTIFCATIONS',
  sendRequest: swRegistration => ({ type: 'SUBSCRIBE_TO_PUSH_NOTIFCATIONS', swRegistration }),
  success: res => ({ type: 'SUBSCRIBE_TO_PUSH_NOTIFCATIONS_SUCCESS', res }),
  failure: error => ({ type: 'SUBSCRIBE_TO_PUSH_NOTIFCATIONS_FAILURE', error }),
};
export const unsubscribe = {
  name: 'UNSUBSCRIBE_FROM_PUSH_NOTIFCATIONS',
  sendRequest: swRegistration => ({ type: 'UNSUBSCRIBE_FROM_PUSH_NOTIFCATIONS', swRegistration }),
  success: res => ({ type: 'UNSUBSCRIBE_FROM_PUSH_NOTIFCATIONS_SUCCESS', res }),
  failure: error => ({ type: 'UNSUBSCRIBE_FROM_PUSH_NOTIFCATIONS_FAILURE', error }),
};
