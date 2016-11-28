import React, { PropTypes } from 'react';

const Navbar = ({ width }) => {
  if (width > 700) {
    return (
      <ul className="w3-navbar w3-light-grey">
        <li><a href="#home">Home</a></li>
        <li><a href="#messages">Link 1</a></li>
      </ul>
    );
  }
  return (
    <ul className="w3-navbar w3-blue-grey">
      <li className="w3-dropdown-hover">
        <i className="material-icons">menu</i>
        <div className="w3-dropdown-content w3-white w3-card-4">
          <a href="#home">Home</a>
          <a href="#messages">Messages</a>
        </div>
      </li>
    </ul>
  );
};

Navbar.propTypes = {
  width: PropTypes.number.isRequired,
};

export default Navbar;
