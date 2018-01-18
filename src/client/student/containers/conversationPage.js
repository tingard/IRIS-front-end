import { connect } from 'react-redux';
import { Map } from 'immutable';
import { getMessages, sendMessage } from '../actions';

import MessageChainPage from '../components/ConversationPage';

const mapStateToProps = (state, ownProps) => {
  const m = state.messages.get('messages').filter(
    i => i.get('id') === ownProps.match.params.messageID,
  );
  const r = {
    id: m.size ? m.get(0).get('id') : null,
    user: state.user,
    isStale: state.messages.get('isStale'),
    isFetching: state.messages.get('isFetching'),
    message: m.size ? m.get(0) : Map({}),
  };
  console.log(r); return r;
};

const mapDispatchToProps = dispatch => ({
  getMessages: () => dispatch(getMessages()),
  sendMessage: m => dispatch(sendMessage(m)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageChainPage);
