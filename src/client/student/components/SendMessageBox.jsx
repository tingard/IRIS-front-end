import React from 'react';
import PropTypes from 'prop-types';
import IrisButton from '../../common-resources/IrisButton';

class SendMessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this._sendMessage = this._sendMessage.bind(this);
  }
  _sendMessage(message) {
    this.props.sendMessage(message);
    this.setState({ message: '' });
  }
  render() {
    return (
      <React.Fragment>
        <label htmlFor="questionInput">
          <h4> Send a message: </h4>
          <input
            type="text"
            name="question"
            id="questionInput"
            placeholder="Type a message"
            className="iris-input"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.ctrlKey) this._sendMessage(this.state.message);
            }}
          />
        </label>
        <IrisButton
          onClick={() => this._sendMessage(this.state.message)}
          type="secondary"
          text="Send"
        />
      </React.Fragment>
    );
  }
}

SendMessageBox.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default SendMessageBox;
