import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import ImageDescription from '../../commonResources/imageDescription';
import IrisButton from '../../commonResources/IrisButton';

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
      { messageId: this.props._id, message: this.input.value },
    );
    this.input.value = '';
  }
  render() {
    if (this.props.isStale && this.props.isFetching) return <div>Loading spinner</div>;
    if ((!this.props.message.get('messages')) || this.props.message.get('messages').size === 0) {
      return (
        <div className="w3-container">
          <p>You don't have any messages with that Id!</p>
          <Link to="/images" className="w3-button w3-border iris-button primary">
            Go back to your images
          </Link>
        </div>
      );
    }
    // breaks for two equal dates, is this a problem?
    const sortFunction = this.state.messageOrder === 'newest' ? (
      (m1, m2) => (m1.get('sendDate') < m2.get('sendDate') ? 1 : -1)
    ) : (
      (m1, m2) => (m1.get('sendDate') > m2.get('sendDate') ? 1 : -1)
    );
    const sortedMessages = this.props.message.get('messages').rest().sort(sortFunction);
    if (this.props._id !== null) {
      const m = this.props.message.get('messages')
        .get(this.props.message.get('messages').size - 1);
      return (
        <div className="w3-container">
          <div className="w3-boder-left w3-panel">
            <h2>For your image tagged:</h2>
            <p>
              <em>
                {`"${this.props.message.get('image').get('note')}"`}
              </em>, most recent message <span className="mf-disable">{moment(m.get('sendDate')).fromNow()}</span>:
            </p>
            <div className="w3-margin" role="group">
              <label htmlFor="message-order-selector" id="message-order-selector-label">
                Change message order
                <select
                  aria-labelledby="message-order-selector-label"
                  className="w3-select select-style"
                  name="message-order-selector"
                  onChange={this.setOrder}
                  ref={(r) => { this.messageOrderSelector = r; }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </label>
            </div>
            <div className="w3-row w3-padding-16">
              <ImageDescription classification={this.props.message.get('classification')} />
            </div>
            <ul
              role="list"
              aria-label={`Messages ordered by ${this.state.messageOrder} first`}
              style={{ listStyle: 'none', paddingLeft: 0 }}
            >
              {
                sortedMessages.map((msg, i) => (
                  <li key={`${this.props._id}-${i}`} role="listitem">
                    <p>
                      <span className="message-dt mf-disable">
                        {capitalize(moment(msg.get('sendDate')).fromNow())}
                      </span>
                      <span className="message-from-who">
                        {msg.get('fromType') === 'student' ? ' you said: ' : ' they said: '}
                      </span>
                      <span className="message-content mf-disable">
                        {msg.get('message')}
                      </span>
                    </p>
                  </li>
                ))
              }
            </ul>
            <div className="w3-row w3-padding-16">
              <div className="w3-col s12">
                <label htmlFor="questionInput">
                  <h3> Send a message: </h3>
                  <input
                    type="text"
                    name="question"
                    id="questionInput"
                    placeholder="Type a message"
                    ref={(r) => { this.input = r; }}
                    className="w3-input w3-border"
                  />
                </label>
                <IrisButton
                  className="w3-margin-right w3-margin-top"
                  onClick={this.sendMessage}
                  type="primary"
                  text="Send"
                />
              </div>
            </div>
          </div>
          <div className="w3-row w3-padding-16">
            <Link to="/images" className="iris-button secondary">
              Go back to messages
            </Link>
          </div>
          <div className="w3-padding-16" />
        </div>
      );
    }
    return <Redirect to="/messages" />;
  }
}

ConversationPage.propTypes = {
  _id: PropTypes.string,
  isFetching: PropTypes.bool,
  isStale: PropTypes.bool,
  message: ImmutablePropTypes.contains({
    messages: ImmutablePropTypes.listOf(
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
