import React from 'react';
import MessagesPageButton from './MessagesPageButton';
import HomePageButton from './HomePageButton';
import ProfilePageButton from './ProfilePageButton';
import '../styles/navbar.scss';

const Navbar = () => (
  <div className="grapheel-navbar">
    <div className="left-button">
      <MessagesPageButton />
    </div>
    <div className="center-button">
      <HomePageButton />
    </div>
    <div className="right-button">
      <ProfilePageButton />
    </div>
  </div>
);

export default Navbar;
