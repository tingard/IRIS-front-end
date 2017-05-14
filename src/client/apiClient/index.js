/* eslint-disable class-methods-use-this */

// TODO: combine request calls to ease server load

class IrisAPI {
  constructor() {
    // initialize storage
    // check API is online
    this.state = {
      apiUrl: 'http://local.zooniverse.org:3000/api',
      _token: null,
      user: null,
    };
  }
  _sendRequest(url, type, bodyHeaders) {
    console.log(url, type, bodyHeaders);
  }
  login() {
    // POST to /api/login with email, pwd, utypt in body headers x-www-form-urlencoded
    this.state.user = {};
  }
  getUserDetails() {
    // GET to /api/${utype}/${uid} with "JWT ${token}" in Authorization header
  }
  getMessages() {
    // GET to /api/${utype}/${uid}/images with "JWT ${token}" in Authorization header
  }
  getImages() {
    if (this.state.user.utype === 'volunteer') {
      // GET to /api/${utype}/${uid}/images with "JWT ${token}" in Authorization header
    }
  }
  startWebSocket() {
    // TODO: this
  }
  stopWebSocket() {
    // TODO: this
  }
}

export default IrisAPI;
