import { connect } from 'react-redux';
import { Map } from 'immutable';

import MessageChainPage from '../components/MessageChainPage';

const mapStateToProps = (state, ownProps) => {
  const m = state.messages.get('messages').filter(
    i => i.get('id') === ownProps.match.params.messageID,
  );
  console.log(m);
  if (m.size) {
    const image = state.images.get('images').filter(
      i => i.get('id') === m.get(0).get('imageID'),
    );
    return m.merge({ user: state.user, image });
  }
  return Map({ user: state.user });
};

export default connect(mapStateToProps)(MessageChainPage);
