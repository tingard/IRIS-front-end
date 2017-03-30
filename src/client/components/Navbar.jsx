import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { themeColors } from '../componentStyles';

const Navbar = ({ width }) => {
  const navClasses = {
    position: 'relative',
    width: '100%',
    backgroundColor: '#000',
    WebkitBoxShadow: `0px -4px 8px 3px ${themeColors.shadowColor}`,
    MozBoxShadow: `0px 0px 8px 3px ${themeColors.shadowColor}`,
    boxShadow: `0px 0px 8px 3px ${themeColors.shadowColor}`,
  };
  if (width > 700) {
    return (
      <ul
        className="w3-navbar w3-text-white"
        style={Object.assign(navClasses, themeColors.darkMain)}
      >
        <li><Link to="/">Home</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><Link to="/user-profile">User Profile</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Help/Contact</Link></li>
        <li className="w3-right">
          <Link to="/logout" style={themeColors.lightHighlight}>Logout</Link>
        </li>
      </ul>
    );
  }
  return (
    <ul
      className="w3-navbar w3-text-white"
      style={Object.assign(navClasses, themeColors.darkMain)}
    >
      <li className="w3-dropdown-hover" style={{ backgroundColor: 'inherit' }}>
        <i className="material-icons">menu</i>
        <div className="w3-dropdown-content w3-white w3-card-4">
          <Link to="/">Home</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/user-profile">User Profile</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Help/Contact</Link>
          <Link to="/logout" style={themeColors.lightHighlight}>Logout</Link>
        </div>
      </li>
    </ul>
  );
};

Navbar.propTypes = {
  width: PropTypes.number.isRequired,
};

export default Navbar;
