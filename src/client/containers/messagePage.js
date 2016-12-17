import { connect } from 'react-redux';
import MessagePage from '../components/MessagePage';

const mapStateToProps = state => ({
  messages: state.messages.toArray(),
});

export default connect(mapStateToProps)(MessagePage);
