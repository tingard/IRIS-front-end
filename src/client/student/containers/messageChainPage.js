import { connect } from 'react-redux';
import MessageChainPage from '../components/MessageChainPage';

const mapStateToProps = (state, ownProps) => {
  const m = state.messages.toArray().filter(
    i => i.id === ownProps.match.params.messageID,
  );
  const image = state.images.toArray().filter(
    i => i.id === m.imageID,
  );
  let r;
  if (m.length) {
    r = Object.assign(
      { user: state.user.toObject(), image },
      m[0],
    );
  } else {
    r = { user: state.user.toObject() };
  }
  console.log('messageChainPage', r);
  return r;
};

export default connect(mapStateToProps)(MessageChainPage);
