import { connect } from 'react-redux';
import ApiWrapper from '../components/ApiWrapper';
import { getMessages, getUserDetails, getImages } from '../actions';


const mapStateToProps = state => ({
  images: state.images,
  user: state.user,
  messages: state.messages,
});

const mapDispatchToProps = dispatch => ({
  getMessages: () => dispatch(getMessages()),
  getUserDetails: () => dispatch(getUserDetails()),
  getImages: () => dispatch(getImages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiWrapper);
