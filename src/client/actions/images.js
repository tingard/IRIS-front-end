export const get = {
  name: 'GET_IMAGES',
  sendRequest: () => ({ type: 'GET_IMAGES' }),
  success: res => ({ type: 'GET_IMAGES_SUCCESS', res }),
  failure: error => ({ type: 'GET_IMAGES_FAILURE', error }),
};
export const upload = {
  name: 'UPLOAD_IMAGE',
  sendRequest: formData => ({ type: 'UPLOAD_IMAGE', formData }),
  success: res => ({ type: 'UPLOAD_IMAGE_SUCCESS', res }),
  failure: error => ({ type: 'UPLOAD_IMAGE_FAILURE', error }),
};
  // this is broad: use to change details about image, hide or mark as answered
export const edit = {
  name: 'EDIT_IMAGE',
  sendRequest: ({ imageId, details }) => ({ type: 'EDIT_IMAGE', payload: { imageId, details } }),
  success: res => ({ type: 'EDIT_IMAGE_SUCCESS', res }),
  failure: error => ({ type: 'EDIT_IMAGE_FAILURE', error }),
};
export const reply = {
  name: 'REPLY_IMAGE',
  sendRequest: formData => ({ type: 'REPLY_IMAGE', formData }),
  success: res => ({ type: 'REPLY_IMAGE_SUCCESS', res }),
  failure: error => ({ type: 'REPLY_IMAGE_FAILURE', error }),
};
