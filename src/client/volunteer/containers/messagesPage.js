import { connect } from 'react-redux';
import MessagesPage from '../components/MessagesPage';

const mapStateToProps = state => ({
  messages: state.messages.set(
    'messages',
    state.messages.get('messages')
      .sort(
        m => m.get('messages').get(
          m.get('messages').size - 1,
        ).get('sendDate'),
      )
      .reverse(),
  ),
  user: state.user,
});

export default connect(mapStateToProps)(MessagesPage);
