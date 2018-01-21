import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './MessagesPageIcon';

const MessagesPageButton = () => (
  <NavLink exact to="/messages">
    <Icon />
  </NavLink>
);

export default MessagesPageButton;
