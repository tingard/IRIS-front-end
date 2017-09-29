import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '../svg/home-icon.svg';

const HomePageButton = () => <NavLink to="/"><HomeIcon /></NavLink>;
export default HomePageButton;
