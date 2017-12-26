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
    messages: messages.sort(
      (m1, m2) => (
        m2.messageChain[m2.messageChain.length - 1].date -
        m1.messageChain[m1.messageChain.length - 1].date
      ),
    ),
    user: state.user.toObject(),
  });
  return r;
};

export default connect(mapStateToProps)(MessagesPage);
