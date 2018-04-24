import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './icons/MessagesPageIcon';

const MessagesPageButton = () => (
  <NavLink exact to="/volunteer/messages">
    <Icon />
  </NavLink>
);

export default MessagesPageButton;
