import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './icons/ProfilePageIcon';

const ProfilePageButton = () => (
  <NavLink exact to="/volunteer/profile">
    <Icon />
  </NavLink>
);

export default ProfilePageButton;
