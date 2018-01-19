import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImmutablePropTypes from 'react-immutable-proptypes';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      help: false,
    };
    this.scrollToEndMessage = this.scrollToEndMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  componentDidMount() {
    this.scrollToEndMessage();
    this.input.focus();
  }
  componentDidUpdate() {
    this.scrollToEndMessage();
  }
  scrollToEndMessage() {
    this.messagesBox.scrollTop = this.messagesBox.clientHeight;
  }
  sendMessage() {
    this.props.sendMessage(
      { messageId: this.props.message.get('id'), message: this.input.value },
    );
    this.input.value = '';
  }
  render() {
    const messageSendFailed = this.props.messagesState.get('sendMessageDidFail') ? 'pending-failed' : '';
    return (
      <div className="message-page-messages-box">
        <div className="w3-row messages-box" ref={(r) => { this.messagesBox = r; }}>
          <div className="w3-row message-image-box">
            <div className="w3-display-container">
              <img
                className="w3-display-middle"
                src={this.props.message.get('image').get('url')}
                alt="this is being described"
              />
            </div>
          </div>
          {this.props.message.get('messageChain').map(
            (m, i) => (
              m.get('fromType') === 'volunteer' ? (
                <div className="w3-row" key={`${this.props.message.get('id')}-${i}`}>
                  <div className="message-page-message w3-display-container">
                    <div
                      className="from-me w3-display-right"
                      data-deltat={`${moment(m.get('sendDate')).fromNow()}`}
                    >
                      <p>{m.get('message')}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w3-row" key={`${this.props.message.get('id')}-${i}`}>
                  <div className="message-page-message w3-display-container">
                    <div
                      className="from-them w3-display-left"
                      data-deltat={`${moment(m.get('sendDate')).fromNow()}`}
                    >
                      <p>{m.get('message')}</p>
                    </div>
                  </div>
                </div>
              )
            ),
          )}
          {this.props.pendingMessages.filter(m => m.get('chainId') === this.props.message.get('id'))
            .map((m, i) => (
              <div className="w3-row" key={`pending-messages-${i}`}>
                <div
                  className="message-page-message w3-display-container"
                >
                  <div
                    className={`from-me w3-display-right ${messageSendFailed}`}
                    data-deltat={`${moment(m.get('sendDate')).fromNow()}`}
                  >
                    <p>{m.get('message')}</p>
                    { this.props.messagesState.get('sendMessageDidFail') ? (
                      <span className="fail-message w3-display-left">Did not send</span>
                    ) : null }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="w3-row messages-submit">
          <input
            className="w3-input"
            type="text"
            ref={(r) => { this.input = r; }}
            onKeyPress={e => (e.key === 'Enter' ? this.sendMessage() : null)}
          />
          <button
            className="submit-reply-button w3-button w3-border w3-round w3-right"
            onClick={this.sendMessage}
          >
            Send Reply
          </button>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  messagesState: ImmutablePropTypes.contains({
    sendMessageDidFail: PropTypes.bool,
  }),
  message: ImmutablePropTypes.contains({
    id: PropTypes.string,
    message: PropTypes.string,
    image: ImmutablePropTypes.contains({
      url: PropTypes.string,
    }),
  }),
  pendingMessages: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      chainId: PropTypes.string,
      message: PropTypes.string,
    }),
  ),
  sendMessage: PropTypes.func,
};

export default Message;
