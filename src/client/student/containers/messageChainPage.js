import { connect } from 'react-redux';
import MessageChainPage from '../components/MessageChainPage';

const mapStateToProps = (state, ownProps) => {
  const m = state.messages.toArray().filter(
    i => i.id === ownProps.match.params.messageID,
  );
  const image = state.images.toArray().filter(
    i => i.id === m.imageID,
  );
  if (m.length) {
    return Object.assign(
      { user: state.user.toObject(), image },
      m[0],
    );
  }
  return { user: state.user.toObject() };
};

export default connect(mapStateToProps)(MessageChainPage);
