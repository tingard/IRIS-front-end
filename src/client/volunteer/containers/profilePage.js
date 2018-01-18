import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';
import { setUserDetails } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  setUserDetails: payload => dispatch(setUserDetails(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
