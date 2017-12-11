import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

const MessagePreview = (props) => {
  const lastMessageDate = props.messageChain[props.messageChain.length - 1].date;
  return (
    <NavLink to={`/messages/${props.id}`}>
      <div className="w3-row w3-display-container">
        <div className="w3-container message-page-message-preview">
          <div className="w3-col s4 message-preview-image">
            <img src={props.imageUrl} alt="" />
          </div>
          <div className="w3-col s8">
            {/*  Teaser of message */}
            <div className="row">
              <span className="message-preview-message">
                {`${props.messageChain[props.messageChain.length - 1].message.slice(0, 25).trim()}...`}
              </span>
            </div>
            {/*  Time since last message */}
            <div className="row">
              <span className="message-preview-time">
                {moment(lastMessageDate).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

MessagePreview.propTypes = {
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  messageChain: PropTypes.array,
};

export default MessagePreview;
