import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImageDescription from '../../common-resources/imageDescription';
import IrisAlert from '../../common-resources/IrisAlert';
import IrisButton from '../../common-resources/IrisButton';
import '../../common-resources/_IrisInput.scss';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToEndMessage = this.scrollToEndMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      shouldShowCompletedAlert: true,
    };
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

  sendMessage() {
    this.props.sendMessage(
      { messageId: this.props.message.get('_id'), message: this.input.value },
    );
    this.input.value = '';
  }

  render() {
    const messageSendFailed = this.props.messagesState.get('sendMessageDidFail') ? 'pending-failed' : '';
    return (
      <div className="message-page-messages-box">
        <div className="w3-row messages-box" ref={(r) => { this.messagesBox = r; }}>
          <div className="w3-row message-image-box w3-padding-16">
            <div className="w3-display-container">
              <a href={this.props.message.get('image').get('url')}>
                <img
                  className="w3-display-middle"
                  src={this.props.message.get('image').get('url')}
                  alt="this is being described"
                />
              </a>
            </div>
          </div>
          <div className="w3-row w3-padding-16">
            <ImageDescription classification={this.props.message.get('classification')} />
          </div>
          {this.props.message.get('messages').rest().map(
            (m, i) => (
              m.get('fromType') === 'volunteer' ? (
                <div
                  className="w3-row"
                  style={{ marginBottom: '30px' }}
                  key={`${this.props.message.get('_id')}-${i}`}
                >
                  <div className="message-page-message from-me">
                    <div
                      className="w3-display-container"
                      data-deltat={`${moment(m.get('sendDate')).fromNow()}`}
                    >
                      <p className="mf-disable">{m.get('message')}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="w3-row"
                  style={{ marginBottom: '30px' }}
                  key={`${this.props.message.get('_id')}-${i}`}
                >
                  <div className="message-page-message from-them">
                    <div
                      className="w3-display-container"
                      data-deltat={`${moment(m.get('sendDate')).fromNow()}`}
                    >
                      <p className="mf-disable">{m.get('message')}</p>
                    </div>
                  </div>
                </div>
              )
            ),
          )}
          {this.props.pendingMessages.filter(m => m.get('chainId') === this.props.message.get('_id'))
            .map((m, i) => (
              <div className="w3-row" key={`pending-messages-${i}`}>
                <div
                  className="message-page-message w3-display-container"
                >
                  <div
                    className={`from-me w3-display-right ${messageSendFailed}`}
                    data-deltat={`${moment(m.get('sendDate')).fromNow()}`}
                  >
                    <p className="mf-disable">{m.get('message')}</p>
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
          {this.props.message.get('markedAsCompleted') && this.state.shouldShowCompletedAlert ? (
            <IrisAlert
              title="Thank you for your help!"
              message="The student has marked this image as completed, thank you for your help!"
              type="info"
              onClose={() => this.setState({ shouldShowCompletedAlert: false })}
            />
          ) : (
            <React.Fragment>
              <input
                className="iris-input iris-input__full-width"
                type="text"
                disabled={this.props.message.get('markedAsCompleted')}
                ref={(r) => { this.input = r; }}
                onKeyPress={e => (e.key === 'Enter' ? this.sendMessage() : null)}
              />
              <IrisButton
                type="primary"
                onClick={this.sendMessage}
                disabled={this.props.message.get('markedAsCompleted')}
                text="Send Reply"
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  messagesState: PropTypes.shape({
    sendMessageDidFail: PropTypes.bool,
    get: PropTypes.func.isRequired,
  }),
  message: PropTypes.shape({
    _id: PropTypes.string,
    message: PropTypes.string,
    markedAsCompleted: PropTypes.bool,
    image: PropTypes.shape({
      url: PropTypes.string,
    }),
    get: PropTypes.func.isRequired,
  }),
  pendingMessages: ImmutablePropTypes.listOf(
    PropTypes.shape({
      chainId: PropTypes.string,
      message: PropTypes.string,
    }),
  ),
  sendMessage: PropTypes.func,
};

export default Message;
