import { connect } from 'react-redux';
import MessageChainPage from '../components/MessageChainPage';

const mapStateToProps = (state, ownProps) => {
  const m = state.messages.toArray().filter(
    i => i.id === ownProps.match.params.messageID,
  )[0];
  const image = state.images.toArray().filter(
    i => i.id === m.imageID,
  );
  let r;
  if (m.length) {
    r = Object.assign(
      { user: state.user.toObject(), image },
      m,
    );
  } else {
    r = { user: state.user.toObject() };
  }
  return r;
};

export default connect(mapStateToProps)(MessageChainPage);
