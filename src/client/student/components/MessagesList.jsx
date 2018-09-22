import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MessageOrderSelector from './MessageOrderSelector';
import Message from './Message';

class MessagesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messageOrder: 'newest' };
  }
  render() {
    return (
      <React.Fragment>
        <h3>Messages:</h3>
        <p>
           Most recent message <span className="mf-disable">{this.props.mostRecent}</span>:
        </p>
        <div className="w3-margin" role="group">
          <label htmlFor="message-order-selector" id="message-order-selector-label">
            Change message order
            <MessageOrderSelector
              onChange={order => this.setState(
                { messageOrder: order },
                () => this.props.setOrder(order),
              )}
            />
          </label>
        </div>
        <ul
          role="list"
          aria-label={`Messages ordered by ${this.state.messageOrder} first`}
          className="w3-container messages-container"
        >
          {
            this.props.messages.map((msg, i) => (
              <li
                key={`message-${i}`}
                role="listitem"
                className={`message ${msg.get('fromType') === 'student' ? 'from-me' : 'from-them'}`}
              >
                <Message message={msg} />
              </li>
            ))
          }
        </ul>
      </React.Fragment>
    );
  }
}

MessagesPanel.propTypes = {
  mostRecent: PropTypes.string,
  messages: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      message: PropTypes.string,
    }),
  ),
  setOrder: PropTypes.func.isRequired,
};

export default MessagesPanel;
