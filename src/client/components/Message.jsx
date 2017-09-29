import React from 'react';
import PropTypes from 'prop-types';

const Message = props => (
  <div
    className="w3-card-4 message-page-message"
    style={{ width: '100%', minHeight: '100px' }}
  >
    <div className="w3-row w3-padding-8">
      <div className="w3-col s3 l2">
        <p>{props.date}</p>
      </div>
      <div className="w3-col m9 l8">
        <p>{props.message}</p>
      </div>
      <div className="w3-col l2">
        IMAGE HERE
      </div>
    </div>
  </div>
);

Message.propTypes = {
  message: PropTypes.string,
  date: PropTypes.string,
};

export default Message;
