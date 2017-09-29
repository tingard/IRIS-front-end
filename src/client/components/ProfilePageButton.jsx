import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../svg/profile-icon.svg';

const ProfilePageButton = () => <Link to="/profile"><ProfileIcon /></Link>;

export default ProfilePageButton;
