import { connect } from 'react-redux';
import UserWidget from '../components/UserWidget';

const mapStateToProps = state => ({
  user: state.user.toObject(),
});

export default connect(mapStateToProps)(UserWidget);
