import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Link, Redirect } from 'react-router-dom';

const capitalize = s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

class MessageChainPage extends Component {
  render() {
    if (typeof this.props.id !== 'undefined') {
      const m = this.props.messageChain[this.props.messageChain.length - 1];
      return (
        <div className="w3-container">
          <h1>Your messages:</h1>
          <div className="w3-card-4 w3-panel">
            <p>
              <span>For the Image you uploaded tagged: <em>{`"${this.props.imageNote}"`}</em>, </span>
              <span>most recent message {moment(m.date).fromNow()}:</span>
            </p>
            {
              this.props.messageChain.reverse().map((msg, i) => (
                <p key={`${this.props.id}-${i}`}>
                  <span className="message-deltaT">
                    {capitalize(moment(msg.date).fromNow())}
                  </span>
                  <span className="message-from-who">
                    {msg.fromMe ? ' you said: ' : ' they said: '}
                  </span>
                  <span className="message-content">
                    {msg.message}
                  </span>
                </p>
              ))
            }
            <div className="w3-row w3-padding-16">
              <div className="w3-col s12">
                <p>
                  <label htmlFor="questionInput">
                    Send a message:
                  </label>
                </p>
                <p>
                  <input
                    type="text"
                    name="question"
                    id="questionInput"
                    placeholder="Type a message"
                    ref={(r) => { this.input = r; }}
                    className="w3-input w3-border"
                  />
                </p>
                <p>
                  <button
                    className="w3-btn w3-green"
                    onClick={() => this.props.sendMessage(this.input.value)}
                  >
                    Send
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="w3-panel">
            <Link to="/messages" className="w3-button">
              Go back to messages
            </Link>
          </div>
        </div>
      );
    }
    return <Redirect to="/messages" />;
  }
}

MessageChainPage.propTypes = {
  id: PropTypes.string,
  imageNote: PropTypes.string,
  messageChain: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ),
  sendMessage: PropTypes.func,
};

MessageChainPage.defaultProps = {
  sendMessage: (m) => { console.log(m); },
};

export default MessageChainPage;
