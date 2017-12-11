import React from 'react';
import { NavLink } from 'react-router-dom';
import MessagesIcon from '../svg/messages-icon.svg';

const MessagesPageButton = () => <NavLink exact to="/messages"><MessagesIcon /></NavLink>;

export default MessagesPageButton;