import { connect } from 'react-redux';
import Message from '../components/Message';
import { sendMessage } from '../actions';

const mapStateToProps = (state, ownProps) => {
  // messages is messages if given else filter using messageID
  const r = {
    message: ownProps.message,
    pendingMessages: state.messages.get('pendingMessages'),
    messagesState: state.messages.get('state'),
    user: state.user,
  };
  return r;
};

const mapDispatchToProps = dispatch => ({
  sendMessage: m => dispatch(sendMessage(m)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
