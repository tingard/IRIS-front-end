import React from 'react';
import Message from './Message';
// import { themeColors } from '../componentStyles';

class MessagePage extends React.Component {
  hello() {
    console.log(this);
  }
  render() {
    return (
      <div className="w3-container">
        { this.props.messages.map(m => (
          <Message {...m} />
        )) }
      </div>
    );
  }
}

MessagePage.propTypes = {
  messages: React.PropTypes.array,
};

export default MessagePage;
