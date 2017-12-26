import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Link, Redirect } from 'react-router-dom';

const capitalize = s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

class MessageChainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageOrder: 'newest',
    };
    this.setOrder = this.setOrder.bind(this);
  }
  setOrder() {
    // TODO: should this be reflected in redux?
    this.setState({ messageOrder: this.messageOrderSelector.value });
  }
  render() {
    const sortFunction = this.state.messageOrder === 'newest' ? (
      (m1, m2) => m2.date - m1.date
    ) : (
      (m1, m2) => m1.date - m2.date
    );
    const sortedMessages = this.props.messageChain.sort(sortFunction);
    if (typeof this.props.id !== 'undefined') {
      const m = this.props.messageChain[this.props.messageChain.length - 1];
      return (
        <div className="w3-container">
          <div className="w3-card-4 w3-panel">
            <h2>For your image tagged:</h2>
            <p><em>{`"${this.props.imageNote}"`}</em>, most recent message {moment(m.date).fromNow()}:</p>
            <div className="w3-margin" role="group">
              <label htmlFor="message-order-selector" id="message-order-selector-label">
                Change message order
              </label>
              <select
                aria-labelledby="message-order-selector-label"
                className="w3-select"
                name="message-order-selector"
                onChange={this.setOrder}
                ref={(r) => { this.messageOrderSelector = r; }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
            <ul
              role="list"
              aria-label={`Messages ordered by ${this.state.messageOrder} first`}
              style={{ listStyle: 'none', paddingLeft: 0 }}
            >
              {
                sortedMessages.map((msg, i) => (
                  <li key={`${this.props.id}-${i}`} role="listitem">
                    <p>
                      <span className="message-dt">
                        {capitalize(moment(msg.date).fromNow())}
                      </span>
                      <span className="message-from-who">
                        {msg.fromMe ? ' you said: ' : ' they said: '}
                      </span>
                      <span className="message-content">
                        {msg.message}
                      </span>
                    </p>
                  </li>
                ))
              }
            </ul>
            <div className="w3-row w3-padding-16">
              <div className="w3-col s12">
                <h3>
                  <label htmlFor="questionInput">
                    Send a message:
                  </label>
                </h3>
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
