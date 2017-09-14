import React from 'react';
import { Link } from 'react-router';
import MessagesIcon from '../svg/messages-icon.svg';

const MessageButton = () => <Link to="/messages"><MessagesIcon /></Link>;

export default MessageButton;
