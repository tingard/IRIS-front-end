import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
// import { uploadImage, getImages } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(HomePage);
