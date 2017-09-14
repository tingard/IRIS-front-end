import React from 'react';
import { Link } from 'react-router';
import ProfileIcon from '../svg/profile-icon.svg';

const MessageButton = () => <Link to="/profile"><ProfileIcon /></Link>;

export default MessageButton;
