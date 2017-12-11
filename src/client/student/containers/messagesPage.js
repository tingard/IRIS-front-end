import { connect } from 'react-redux';
import MessagesPage from '../components/MessagesPage';

const mapStateToProps = (state, ownProps) => {
  let messages;
  if (ownProps.filterByImage) {
    messages = state.messages.toArray().filter(
      m => m.imageID === ownProps.match.params.imageID,
    );
  } else {
    messages = state.messages.toArray();
  }
  const r = ({
    messages,
    user: state.user.toObject(),
  });
  return r;
};

export default connect(mapStateToProps)(MessagesPage);
