import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import ImageDescription from '../../common-resources/imageDescription';
import IrisButton from '../../common-resources/IrisButton';
import ratingValues from '../../values/ratingValues';

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
        <div id="student-conversation-page" className="w3-container">
          <div className="w3-boder-left w3-panel">
            <h2>
              {`For your image tagged "${this.props.message.get('image').get('note')}"`}
            </h2>
            <section className="w3-row w3-padding-16" role="group">
              <ImageDescription classification={this.props.message.get('classification')} />
            </section>
            <section>
              <h3>Messages:</h3>
              <p>
                 Most recent message <span className="mf-disable">{moment(m.get('sendDate')).fromNow()}</span>:
              </p>
              <div className="w3-margin" role="group">
                <label htmlFor="message-order-selector" id="message-order-selector-label">
                  Change message order
                  <select
                    aria-labelledby="message-order-selector-label"
                    className="select-style"
                    name="message-order-selector"
                    onChange={this.setOrder}
                    ref={(r) => { this.messageOrderSelector = r; }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </label>
              </div>
              <ul
                role="list"
                aria-label={`Messages ordered by ${this.state.messageOrder} first`}
                className="w3-container messages-container"
              >
                {
                  sortedMessages.map((msg, i) => (
                    <li
                      key={`${this.props._id}-${i}`}
                      role="listitem"
                      className={`message ${msg.get('fromType') === 'student' ? 'from-me' : 'from-them'}`}
                    >
                      <div className="message-box">
                        <div className="message-info">
                          <span className="message-dt mf-disable">
                            {capitalize(moment(msg.get('sendDate')).fromNow())}
                          </span>
                          <span className="message-from-who">
                            {msg.get('fromType') === 'student' ? ' you said: ' : ' they said: '}
                          </span>
                        </div>
                        <div className="message-content mf-disable">
                          {msg.get('message')}
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
              {this.props.message.get('markedAsCompleted') ? null : (
                <div className="w3-row w3-padding-16">
                  <div className="w3-col s12">
                    <label htmlFor="questionInput">
                      <h4> Send a message: </h4>
                      <input
                        type="text"
                        name="question"
                        id="questionInput"
                        placeholder="Type a message"
                        ref={(r) => { this.input = r; }}
                        className="w3-input w3-border"
                        onKeyPress={(e) => { if (e.key === 'Enter' && !e.ctrlKey) this.sendMessage(); }}
                      />
                    </label>
                    <IrisButton
                      onClick={this.sendMessage}
                      type="secondary"
                      text="Send"
                    />
                  </div>
                </div>
              )}
            </section>
          </div>
          {this.props.message.get('markedAsCompleted') ? (
            <div className="w3-row w3-container">
              <p>You accepted this message and rated the description {ratingValues[this.props.message.get('rating')].text}</p>
            </div>
          ) : (
            <div className="w3-row w3-container">
              <p>
                If the volunteer has answered your question, please accept their response!
                This will close this conversation window.
              </p>
              <Link
                to={`/images/descriptions/${this.props.message.get('image').get('_id')}/${this.props.message.get('_id')}`}
                className="iris-button primary w3-margin-right"
              >
                Accept this description
              </Link>
              <Link
                to={`/images/descriptions/${this.props.message.get('image').get('_id')}`}
                className="w3-margin-right iris-button tertiary"
              >
                Descriptions of this image
              </Link>
              <Link to="/images" className="iris-button tertiary">
                Your images
              </Link>
            </div>
          )}
          <div className="w3-padding-16" />
        </div>
      );
    }
    return <Redirect to="/volunteer/messages" />;
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
