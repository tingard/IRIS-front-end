import React from 'react';
import PropTypes from 'prop-types';

const Message = props => (
  <div className="w3-card-4" style={{ width: '300px', height: '300px' }}>{props.text}</div>
);

Message.propTypes = {
  text: PropTypes.string,
};

export default Message;
