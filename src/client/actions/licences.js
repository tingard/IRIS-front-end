export const get = {
  name: 'GET_LICENCES',
  sendRequest: () => ({ type: 'GET_LICENCES' }),
  success: res => ({ type: 'GET_LICENCES_SUCCESS', res }),
  failure: error => ({ type: 'GET_LICENCES_FAILURE', error }),
};
export const upload = {
  name: 'PURCHASE_LICENCE',
  sendRequest: formData => ({ type: 'PURCHASE_LICENCE', formData }),
  success: res => ({ type: 'PURCHASE_LICENCE_SUCCESS', res }),
  failure: error => ({ type: 'PURCHASE_LICENCE_FAILURE', error }),
};
  // this is broad: use to change details about image, hide or mark as answered
export const edit = {
  name: 'EDIT_LICENCE',
  sendRequest: ({ imageId, details }) => ({ type: 'EDIT_LICENCE', payload: { imageId, details } }),
  success: res => ({ type: 'EDIT_LICENCE_SUCCESS', res }),
  failure: error => ({ type: 'EDIT_LICENCE_FAILURE', error }),
};
