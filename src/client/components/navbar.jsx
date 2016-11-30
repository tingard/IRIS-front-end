import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navbar = ({ width }) => {
  if (width > 700) {
    return (
      <ul className="w3-navbar w3-light-grey">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/messages">Link 1</Link></li>
      </ul>
    );
  }
  return (
    <ul className="w3-navbar w3-blue-grey">
      <li className="w3-dropdown-hover">
        <i className="material-icons">menu</i>
        <div className="w3-dropdown-content w3-white w3-card-4">
          <Link to="/">Home</Link>
          <Link to="/messages">Messages</Link>
        </div>
      </li>
    </ul>
  );
};

Navbar.propTypes = {
  width: PropTypes.number.isRequired,
};

export default Navbar;
