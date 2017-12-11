import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      help: false,
    };
    this.scrollToEndMessage = this.scrollToEndMessage.bind(this);
  }
  componentDidMount() {
    this.scrollToEndMessage();
  }
  componentDidUpdate() {
    this.scrollToEndMessage();
  }
  scrollToEndMessage() {
    this.messagesBox.scrollTop = this.messagesBox.clientHeight;
  }
  render() {
    return (
      <div className="message-page-messages-box">
        <div className="w3-row message-image-box">
          <div className="w3-display-container">
            <img
              className="w3-display-middle"
              src={this.props.message.imageUrl}
              alt="this is being described"
            />
          </div>
        </div>
        <div className="w3-row messages-box" ref={(r) => { this.messagesBox = r; }}>
          {this.props.message.messageChain.map(
            (m, i) => (
              m.fromMe ? (
                <div className="w3-row" key={`${this.props.message.id}-${i}`}>
                  <div className="message-page-message w3-display-container">
                    <div className="from-me w3-display-right">
                      <p>{m.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w3-row" key={`${this.props.message.id}-${i}`}>
                  <div className="message-page-message w3-display-container">
                    <div className="from-them w3-display-left">
                      <p>{m.message}</p>
                    </div>
                  </div>
                </div>
              )
            ),
          )}
        </div>
        <div className="w3-row messages-submit">
          <input className="w3-input" type="text" />
          <button
            className="submit-reply-button w3-button w3-border w3-round w3-right"
          >
            Send Reply
          </button>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object,
};

export default Message;
