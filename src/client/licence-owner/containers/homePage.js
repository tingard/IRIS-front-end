import { connect } from 'react-redux';
import HomePage from '../components/HomePage/index';
import { logout } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
  images: state.images,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch(logout()).then(() => ownProps.history.push('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
