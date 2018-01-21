import { connect } from 'react-redux';
import MessagesPage from '../components/MessagesPage';

const mapStateToProps = (state) => {
  const r = ({
    messages: state.messages.set(
      'messages',
      state.messages.get('messages')
        .sort(
          m => m.get('messageChain').get(
            m.get('messageChain').size - 1,
          ).get('sendDate'),
        ).reverse(),
    ),
    user: state.user,
  });
  return r;
};

export default connect(mapStateToProps)(MessagesPage);
