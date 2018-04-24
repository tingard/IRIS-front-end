import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  borderRadius: '2px',
  border: '1px solid #aaa',
};

const Navbar = () => (
  <nav className="w3-container w3-bar iris-narrow-page" role="navigation">
    <NavLink to="/student" className="w3-bar-item w3-button" exact activeStyle={activeStyle}>
      Home
    </NavLink>
    <NavLink to="/student/images" className="w3-bar-item w3-button" activeStyle={activeStyle}>
      Images
    </NavLink>
    <NavLink to="/student/profile" className="w3-bar-item w3-button" activeStyle={activeStyle}>
      Profile
    </NavLink>
    <NavLink to="/student/feedback" className="w3-bar-item w3-button" activeStyle={activeStyle}>
      Leave feedback
    </NavLink>
  </nav>
);

export default Navbar;
