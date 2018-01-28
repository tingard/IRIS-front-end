import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { uploadImage, getImages } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
  messages: state.messages,
  images: state.images,
});

const mapDispatchToProps = dispatch => ({
  uploadImage: formData => dispatch(uploadImage(formData)),
  getImages: () => dispatch(getImages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
