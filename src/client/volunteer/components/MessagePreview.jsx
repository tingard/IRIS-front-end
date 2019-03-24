import React from 'react';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

const MessagePreview = (props) => {
  if (props.image === null) {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );
  }
  const lastMessageDate = props.messages.get(props.messages.size - 1).get('sendDate');
  const regExp = /res.cloudinary.com\/(.*?)\/image\/upload\/(.*?)$/i;
  const match = regExp.exec(props.image.get('url'));
  const imgUrl = `https://res.cloudinary.com/${match[1]}/c_scale,w_100/${match[2]}`;
  return (
    <NavLink to={`/volunteer/messages/${props._id}`}>
      <div className="w3-row w3-display-container">
        <div className="w3-container message-page-message-preview">
          <div className="w3-col s4 message-preview-image">
            <img src={imgUrl} alt="" />
          </div>
          <div className="w3-col s8">
            {/*  Teaser of message */}
            <div className="row">
              <span className="message-preview-message mf-disable">
                {`${
                  props.messages.get(props.messages.size - 1)
                    .get('message').slice(0, 25).trim()}...`}
              </span>
            </div>
            {/*  Time since last message */}
            <div className="row">
              <span className="message-preview-time mf-disable">
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
  _id: PropTypes.string,
  image: PropTypes.instanceOf(Map),
  messages: PropTypes.instanceOf(List),
};

export default MessagePreview;
