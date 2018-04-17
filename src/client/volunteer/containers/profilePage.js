import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';
import { setUserDetails, dismissUpdateAlert, logout } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setUserDetails: payload => dispatch(setUserDetails(payload)),
  dismissUpdateAlert: () => dispatch(dismissUpdateAlert),
  logout: () => dispatch(logout()).then(() => ownProps.history.push('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
