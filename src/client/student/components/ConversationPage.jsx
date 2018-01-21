import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';

const capitalize = s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

class ConversationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageOrder: 'newest',
    };
    this.setOrder = this.setOrder.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  setOrder() {
    // TODO: should this be reflected in redux?
    this.setState({ messageOrder: this.messageOrderSelector.value });
  }
  sendMessage() {
    this.props.sendMessage(
      { messageId: this.props.id, message: this.input.value },
    );
    this.input.value = '';
  }
  render() {
    if (this.props.isFetching) return <div>Loading spinner</div>;
    if (this.props.message.get('messageChain').size === 0) {
      return <Redirect to="/messages" />;
    }
    // breaks for two equal dates, is this a problem?
    const sortFunction = this.state.messageOrder === 'newest' ? (
      (m1, m2) => (m1.get('sendDate') < m2.get('sendDate') ? 1 : -1)
    ) : (
      (m1, m2) => (m1.get('sendDate') > m2.get('sendDate') ? 1 : -1)
    );
    const sortedMessages = this.props.message.get('messageChain').sort(sortFunction);
    if (this.props.id !== null) {
      const m = this.props.message.get('messageChain')
        .get(this.props.message.get('messageChain').size - 1);
      return (
        <div className="w3-container">
          <div className="w3-boder-left w3-panel">
            <h2>For your image tagged:</h2>
            <p>
              <em>
                {`"${this.props.message.get('image').get('note')}"`}
              </em>, most recent message {moment(m.get('sendDate')).fromNow()}:
            </p>
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
                        {capitalize(moment(msg.get('sendDate')).fromNow())}
                      </span>
                      <span className="message-from-who">
                        {msg.get('fromType') === 'student' ? ' you said: ' : ' they said: '}
                      </span>
                      <span className="message-content">
                        {msg.get('message')}
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
                    onClick={this.sendMessage}
                  >
                    Send
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="w3-panel">
            <Link to="/messages" className="w3-button w3-border">
              Go back to messages
            </Link>
          </div>
        </div>
      );
    }
    return <Redirect to="/messages" />;
  }
}

ConversationPage.propTypes = {
  id: PropTypes.string,
  isFetching: PropTypes.bool,
  message: ImmutablePropTypes.contains({
    messageChain: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        message: PropTypes.string,
      }),
    ),
    image: ImmutablePropTypes.contains({
      url: PropTypes.string,
      note: PropTypes.string,
      question: PropTypes.string,
    }),
  }),
  sendMessage: PropTypes.func,
};

export default ConversationPage;
