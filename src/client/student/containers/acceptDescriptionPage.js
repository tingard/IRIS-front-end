import { connect } from 'react-redux';
import AcceptDescriptionPage from '../components/AcceptDescriptionPage';

import { acceptDescription } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const filteredMessages = state.messages.get('messages').filter(
    m => m.get('_id') === ownProps.match.params.messageId,
  );
  let message = null;
  if (filteredMessages.size > 0) {
    message = filteredMessages.get(0);
  }
  return {
    user: state.user,
    isFetching: state.images.get('state').get('isFetching') || state.messages.get('state').get('isFetching'),
    message,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  acceptDescription: rating => dispatch(acceptDescription({
    messageId: ownProps.match.params.messageId,
    rating,
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AcceptDescriptionPage);
