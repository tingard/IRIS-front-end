import { connect } from 'react-redux';
import MessagesPage from '../components/MessagesPage';

const mapStateToProps = (state) => {
  const r = ({
    messages: state.messages.toArray(),
    user: state.user.toObject(),
  });
  return r;
};

export default connect(mapStateToProps)(MessagesPage);
