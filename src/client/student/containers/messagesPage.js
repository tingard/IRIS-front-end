import { connect } from 'react-redux';
import MessagesPage from '../components/MessagesPage';

const mapStateToProps = (state, ownProps) => {
  let messages;
  if (ownProps.filterByImage) {
    messages = state.messages.get('messages').filter(
      m => m.get('image').get('_id') === ownProps.match.params.imageId,
    );
  } else {
    messages = state.messages.get('messages');
  }
  const r = {
    isStale: state.messages.get('state').get('isStale'),
    isFetching: state.messages.get('state').get('isFetching'),
    isFiltered: ownProps.filterByImage,
    invalidId: state.messages.get('messages').some(
      m => m.get('image').get('_id') === ownProps.match.params.imageI,
    ),
    messages: messages.sort(
      (m1, m2) => (
        m2.get('messages').get(m2.get('messages').size - 1).get('sendDate') <
        m1.get('messages').get(m1.get('messages').size - 1).get('sendDate')
      ),
    ),
    user: state.user,
  };
  return r;
};

export default connect(mapStateToProps)(MessagesPage);
