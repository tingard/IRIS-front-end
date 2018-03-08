import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';
import { setUserDetails, dismissUpdateAlert, logout } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
});

console.log(dismissUpdateAlert);
const mapDispatchToProps = dispatch => ({
  setUserDetails: payload => dispatch(setUserDetails(payload)),
  dismissUpdateAlert: () => dispatch(dismissUpdateAlert),
  logout: () => dispatch(logout()),

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
