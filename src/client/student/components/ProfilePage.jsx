import React from 'react';
import PropTypes from 'prop-types';

const ProfilePage = props => (
  <div className="w3-container w3-animate-opacity">
    <h1>Your Profile:</h1>
    <p>Name: {props.firstName} {props.lastName}</p>
    <p>Email: {props.email}</p>
    <p>{`${props.isFetching}`}</p>
    <button onClick={props.fetchUserDetails}>Refresh</button>
  </div>
);

ProfilePage.propTypes = {
  isFetching: PropTypes.bool,
  fetchUserDetails: PropTypes.func,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
};

export default ProfilePage;
