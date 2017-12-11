import { connect } from 'react-redux';
import Message from '../components/Message';

const mapStateToProps = (state, ownProps) => {
  // messageChain is messageChain if given else filter using messageID
  const r = {
    message: ownProps.message,
    user: state.user.toObject(),
  };
  return r;
};

// TODO: mapDispatchToProps

export default connect(mapStateToProps)(Message);
