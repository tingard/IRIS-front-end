import React from 'react';
import PropTypes from 'prop-types';

const ProfilePage = props => (
  <div className="w3-container w3-animate-opacity">
    <h1>Your Profile:</h1>
    <p>Username: {props.uname}</p>
    <p>Email: {props.email}</p>
    <p>nimages: {props.images}</p>
    <p>Rating: {props.rating}</p>
    <p>Bio: <em>{props.bio}</em></p>
  </div>
);

ProfilePage.propTypes = {
  uname: PropTypes.string,
  email: PropTypes.string,
  images: PropTypes.number,
  rating: PropTypes.number,
  bio: PropTypes.string,
};

export default ProfilePage;
