import { connect } from 'react-redux';
import MessagesPage from '../components/MessagesPage';

const mapStateToProps = (state, ownProps) => {
  let messages;
  if (ownProps.filterByImage) {
    messages = state.messages.get('messages').filter(
      m => m.get('imageID') === ownProps.match.params.imageID,
    );
  } else {
    messages = state.messages.get('messages');
  }
  const r = {
    messages: messages.sort(
      (m1, m2) => (
        m2.get('messageChain').get(m2.get('messageChain').size - 1).get('date') -
        m1.get('messageChain').get(m1.get('messageChain').size - 1).get('date')
      ),
    ),
    user: state.user,
  };
  return r;
};

export default connect(mapStateToProps)(MessagesPage);
