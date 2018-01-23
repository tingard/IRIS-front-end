import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ProfilePage = props => (
  props.state.get('isFetching') ?
    <div>Connecting to the IRIS database...</div> :
    <div className="w3-container w3-animate-opacity">
      <div className="w3-panel">
        <h1>Your Profile:</h1>
        <p>Name: {props.name}</p>
        <p>Email: {props.email}</p>
      </div>
      <p>TODO: browser / email notification preferences</p>
      <div className="w3-row">
        <button
          disabled
          className="change-pwd-button w3-button w3-border w3-round w3-bar w3-hover-black"
        >
          Change Password
        </button>
      </div>
      <div className="w3-row">
        <button
          disabled
          className="delete-acc-button w3-button w3-border w3-round w3-bar w3-hover-black"
        >
          Delete Account
        </button>
      </div>
      <div className="w3-row w3-padding-48" />
    </div>
);

ProfilePage.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  state: ImmutablePropTypes.contains({
    isFetching: PropTypes.bool,
  }),
};

export default ProfilePage;
