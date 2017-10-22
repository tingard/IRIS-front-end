import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MessagePreview = (props) => {
  const lastMessageDate = props.messageChain[props.messageChain.length - 1].date;
  // calculate time since last message in seconds
  const dT = (Date.now() - lastMessageDate) / (1000);
  console.log(lastMessageDate, dT);
  let dTmessage;
  if (dT < 60) { // less than a minute
    dTmessage = 'Just now';
  } else if (dT < 3600) { // less than an hour
    dTmessage = `${parseInt(dT / 60, 10)} minutes ago`;
  } else if (dT < 86400) { // less than a day
    dTmessage = `${parseInt(dT / 3600, 10)} hour${parseInt(dT / 3600, 10) > 1 ? 's' : ''} ago`;
  } else { // more than a day
    dTmessage = `${parseInt(dT / 86400, 10)} days ago`;
  }
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
                {dTmessage}
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
