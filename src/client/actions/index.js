/* eslint-disable global-require */
export const userDetails = require('./userDetails');
export const images = require('./images');
export const messages = require('./messages');
export const licences = require('./licences');
export const serviceWorker = require('./service-worker');

export const fetchWrapper = api => (
  type => (
    // usage: dispatch(fetchedAction(imgObj))
    payload => (
      (dispatch) => {
        // make sure we have auth loaded in
        api.loadTokenFromStorage();
        if (!api.state.user.type) {
          window.location.replace('/login/volunteer');
        }
        // send the the request action (start loading spinners etc...)
        dispatch(type.sendRequest(payload));
        // api.handle will return a Promise, chain to that promise and dispatch
        // appropriate action
        return api.handle(type, payload).then(
          res => dispatch(type.success(res)),
          err => dispatch(type.failure(err)),
        );
      }
    )
  )
);
