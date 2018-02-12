import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';
import { setUserDetails, logout } from '../actions';

const mapStateToProps = state => state.user.toObject();

const mapDispatchToProps = dispatch => ({
  setUserDetails: payload => dispatch(setUserDetails(payload)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
