import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MessagePreview = props => (
  <NavLink to={`/messages/${props.id}`}>
    <div className="w3-row w3-display-container">
      <div className="w3-container message-page-message-preview">
        <div className="w3-col s4 message-preview-image">
          <img src={props.imageUrl} alt="" />
        </div>
        <div className="w3-col s8">
          {props.messageChain[props.messageChain.length - 1].date}
        </div>
      </div>
    </div>
  </NavLink>
);

MessagePreview.propTypes = {
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  messageChain: PropTypes.array,
};

export default MessagePreview;
