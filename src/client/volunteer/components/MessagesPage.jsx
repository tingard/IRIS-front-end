import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MediaQuery from 'react-responsive';
import { Redirect } from 'react-router-dom';
import Message from '../containers/message';
import MessagePreview from '../components/MessagePreview';
import IrisLoader from '../../common-resources/IrisLoader';

class MessagesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docked: true,
      open: true,
    };
  }
  render() {
    if (this.props.messages.get('state').get('isFetching') && this.props.messages.get('messages').size === 0) {
      return <IrisLoader />;
    }
    const routerMessageID = this.props.match.params.messageID || false;
    const selectedMessage = routerMessageID ?
      this.props.messages.get('messages').filter(m => m.get('_id') === routerMessageID).get(0)
      : this.props.messages.get('messages').get(0);
    if (routerMessageID && !selectedMessage) {
      return <Redirect to="/volunteer/messages" />;
    } else if (!selectedMessage) {
      return (
        <div className="w3-container w3-panel">
          <h2>You don't have any messages yet.</h2>
          <p>When you reply to an image it will appear here.</p>
        </div>
      );
    }
    return (
      <div className="w3-container w3-panel">
        {/* Load the naviagtion menu only if the screen is big
          enough or a message has not been selected */}
        {this.props.match.params.messageID ?
          /* We have a selected message */
          <MediaQuery minWidth={601}>
            {/* That's not been scaled down */}
            <div className="w3-col m4 message-page-navigation">
              {this.props.messages.get('messages').map(m => <MessagePreview key={m.get('_id')} {...m.toObject()} />)}
            </div>
          </MediaQuery>
          :
          <div className="w3-col m4 message-page-navigation">
            {this.props.messages.get('messages').map(m => <MessagePreview key={m.get('_id')} {...m.toObject()} />)}
          </div>
        }
        {/* Load the content panel only if the screen is big
          enough or a message has been selected */}
        {!routerMessageID ?
          /* We do not have a selected message */
          <MediaQuery minWidth={601}>
            {/* That's not been scaled down */}
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
  messages: ImmutablePropTypes.contains({
    messages: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        _id: PropTypes.string,
      }),
    ),
    isFetching: PropTypes.bool,
    isStale: PropTypes.bool,
  }),
  match: PropTypes.object,
};

export default MessagesPage;
