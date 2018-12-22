import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import ImageDescription from '../../common-resources/imageDescription';
import MessagesList from './MessagesList';
import SendMessageBox from './SendMessageBox';
import AcceptDescriptionPrompt from './AcceptDescriptionPrompt';
import ratingValues from '../../common-resources/ratingValues';
import '../styles/conversation-page.scss';

class ConversationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageOrder: 'newest',
    };
    this.setOrder = this.setOrder.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  setOrder(order) {
    // TODO: should this be reflected in redux?
    this.setState({ messageOrder: order });
  }

  sendMessage(message) {
    this.props.sendMessage(
      { messageId: this.props._id, message },
    );
  }

  render() {
    if (this.props._id === null) {
      return <Redirect to="/volunteer/messages" />;
    }
    if (this.props.isStale && this.props.isFetching) {
      return <div>Loading spinner</div>;
    }
    if ((!this.props.message.get('messages')) || this.props.message.get('messages').size === 0) {
      return (
        <div className="w3-container">
          <p>You don't have any messages with that Id!</p>
          <Link to="/student/images" className="w3-button w3-border iris-button primary">
            Go back to your images
          </Link>
        </div>
      );
    }
    const sortFunction = this.state.messageOrder === 'newest' ? (
      (m1, m2) => (m1.get('sendDate') < m2.get('sendDate') ? 1 : -1)
    ) : (
      (m1, m2) => (m1.get('sendDate') > m2.get('sendDate') ? 1 : -1)
    );
    const sortedMessages = this.props.message.get('messages').rest().sort(sortFunction);
    const mostRecent = moment(
      this.props.message.get('messages')
        .get(this.props.message.get('messages').size - 1)
        .get('sendDate'),
    ).fromNow();
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
            <MessagesList
              mostRecent={mostRecent}
              messages={sortedMessages}
              setOrder={this.setOrder}
            />
            {this.props.message.get('markedAsCompleted') ? null : (
              <div className="w3-row w3-padding-16">
                <div className="w3-col s12">
                  <SendMessageBox sendMessage={this.sendMessage} />
                </div>
              </div>
            )}
          </section>
        </div>
        {this.props.message.get('markedAsCompleted') ? (
          <div className="w3-row w3-container">
            <p>You accepted this message and rated the description {ratingValues[this.props.message.get('rating')].text}</p>
          </div>
        ) : <AcceptDescriptionPrompt message={this.props.message} />
        }
        <div className="w3-padding-16" />
      </div>
    );
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
