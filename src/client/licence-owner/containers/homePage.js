import { connect } from 'react-redux';
import HomePage from '../components/HomePage/index';
// import { uploadImage, getImages } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
  images: state.images,
});

export default connect(mapStateToProps)(HomePage);
