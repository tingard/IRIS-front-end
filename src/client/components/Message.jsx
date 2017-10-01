import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      help: false,
    };
  }
  render() {
    return (
      <p>{this.props.message.message}</p>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object,
};

export default Message;
