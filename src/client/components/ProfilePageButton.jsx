import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '../svg/profile-icon.svg';

const ProfilePageButton = () => <NavLink to="/profile"><ProfileIcon /></NavLink>;

export default ProfilePageButton;
