import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { getUserDetails, getMessages, getImages, uploadImage } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
  messages: state.messages,
  images: state.images,
});

const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch(getUserDetails({ hi: 'there' })),
  getMessages: () => dispatch(getMessages()),
  getImages: () => dispatch(getImages()),
  uploadImage: formData => dispatch(uploadImage(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
