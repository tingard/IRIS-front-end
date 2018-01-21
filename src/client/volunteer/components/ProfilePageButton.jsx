import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './MessagesPageIcon';

const ProfilePageButton = () => (
  <NavLink exact to="/profile">
    <Icon />
  </NavLink>
);

export default ProfilePageButton;
