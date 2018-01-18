import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';
import { getUserDetails, setUserDetails } from '../actions';

const mapStateToProps = state => state.user.toObject();

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: () => dispatch(getUserDetails()),
  setUserDetails: payload => dispatch(setUserDetails(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
