export const get = {
  name: 'GET_USER_DETAILS',
  sendRequest: () => ({ type: 'GET_USER_DETAILS' }),
  success: res => ({ type: 'GET_USER_DETAILS_SUCCESS', res }),
  failure: error => ({ type: 'GET_USER_DETAILS_FAILURE', error }),
};
export const set = {
  name: 'SET_USER_DETAILS',
  sendRequest: ({ details }) => ({ type: 'SET_USER_DETAILS', details }),
  success: res => ({ type: 'SET_USER_DETAILS_SUCCESS', res }),
  failure: error => ({ type: 'SET_USER_DETAILS_FAILURE', error }),
};
export const setLevels = {
  name: 'SET_USER_LEVELS',
  sendRequest: details => ({ type: 'SET_USER_LEVELS', details }),
  success: res => ({ type: 'SET_USER_LEVELS_SUCCESS', res }),
  failure: error => ({ type: 'SET_USER_LEVELS_FAILURE', error }),
};
export const changePassword = {
  name: 'CHANGE_PASSWORD',
  sendRequest: ({ oldPassword, newPassword }) => (
    { type: 'CHANGE_PASSWORD', pwds: { oldPassword, newPassword } }
  ),
  success: res => ({ type: 'CHANGE_PASSWORD_SUCCESS', res }),
  failure: error => ({ type: 'CHANGE_PASSWORD_ERROR', error }),
};
export const logout = {
  name: 'LOGOUT',
  sendRequest: () => ({ type: 'LOGOUT' }),
  success: res => ({ type: 'LOGOUT_SUCCESS', res }),
  failure: error => ({ type: 'LOGOUT_FAILURE', error }),
};
