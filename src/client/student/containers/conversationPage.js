import { connect } from 'react-redux';
import { Map } from 'immutable';
import { sendMessage } from '../actions';

import MessageChainPage from '../components/ConversationPage';

const mapStateToProps = (state, ownProps) => {
  const m = state.messages.get('messages').filter(
    i => i.get('id') === ownProps.match.params.messageID,
  );
  const r = {
    id: m.size ? m.get(0).get('id') : null,
    user: state.user,
    isFetching: state.messages.get('state').get('isFetching'),
    message: m.size ? m.get(0) : Map({}),
  };
  console.log(r); return r;
};

const mapDispatchToProps = dispatch => ({
  sendMessage: m => dispatch(sendMessage(m)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageChainPage);
