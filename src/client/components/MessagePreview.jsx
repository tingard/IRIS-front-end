import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MessagePreview = props => (
  <NavLink to={`/messages/${props.id}`}>
    <div className="w3-row">
      <div className="w3-container message-page-message-preview">
        <div className="w3-col s4 message-preview-image">
          I am an image
        </div>
        <div className="w3-col s8">
          {props.date}
        </div>
      </div>
    </div>
  </NavLink>
);

MessagePreview.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
};

export default MessagePreview;
