import { connect } from 'react-redux';
import { Map } from 'immutable';
import { sendMessage } from '../actions';

import ConversationPage from '../components/ConversationPage';

const mapStateToProps = (state, ownProps) => {
  const m = state.messages.get('messages').filter(
    i => i.get('_id') === ownProps.match.params.messageID,
  );
  const r = {
    _id: m.size ? m.get(0).get('_id') : null,
    user: state.user,
    isFetching: state.messages.get('state').get('isFetching'),
    message: m.size ? m.get(0) : Map({}),
  };
  return r;
};

const mapDispatchToProps = dispatch => ({
  sendMessage: m => dispatch(sendMessage(m)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationPage);
