import React from 'react';
import PropTypes from 'prop-types';
import Message from '../containers/message';
import MessagePreview from '../components/MessagePreview';

const MediaQuery = require('react-responsive');

class MessagesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docked: true,
      open: true,
    };
  }
  render() {
    const routerMessageID = this.props.match.params.messageID;
    const selectedMessage = routerMessageID ?
      this.props.messages.filter(m => m.id === routerMessageID)[0]
      : this.props.messages[0];
    return (
      <div className="w3-container w3-panel">
        {/* Load the naviagtion menu only if the screen is big
          enough or a message has not been selected */}
        {this.props.match.params.messageID ?
          /* We have a selected message */
          <MediaQuery minWidth={601}>
            {/* That's not been scaled down*/}
            <div className="w3-col m4 message-page-navigation">
              {this.props.messages.map(m => <MessagePreview key={m.id} {...m} />)}
            </div>
          </MediaQuery>
          :
          <div className="w3-col m4 message-page-navigation">
            {this.props.messages.map(m => <MessagePreview key={m.id} {...m} />)}
          </div>
        }
        {/* Load the content panel only if the screen is big
          enough or a message has been selected */}
        {!this.props.match.params.messageID ?
          /* We do not have a selected message */
          <MediaQuery minWidth={601}>
            {/* That's not been scaled down*/}
            <div className="w3-col m8 message-page-content">
              <Message message={selectedMessage} />
            </div>
          </MediaQuery>
          :
          <div className="w3-col m8 message-page-content">
            <Message message={selectedMessage} />
          </div>
        }
      </div>
    );
  }
}

MessagesPage.propTypes = {
  messages: PropTypes.array,
  match: PropTypes.object,
};

export default MessagesPage;
