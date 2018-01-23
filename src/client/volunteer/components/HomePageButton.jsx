import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './icons/HomePageIcon';

const HomePageButton = () => (
  <NavLink exact to="/">
    <Icon />
  </NavLink>
);
export default HomePageButton;
