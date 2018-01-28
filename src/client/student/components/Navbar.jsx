import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  borderRadius: '2px',
  border: '1px solid #aaa',
};

const Navbar = () => (
  <nav className="w3-container w3-bar" role="navigation">
    <NavLink to="/" className="w3-bar-item w3-button" exact activeStyle={activeStyle}>
      Home
    </NavLink>
    <NavLink to="/images" className="w3-bar-item w3-button" activeStyle={activeStyle}>
      Images
    </NavLink>
    <NavLink to="/profile" className="w3-bar-item w3-button" activeStyle={activeStyle}>
      Profile
    </NavLink>
  </nav>
);

export default Navbar;
