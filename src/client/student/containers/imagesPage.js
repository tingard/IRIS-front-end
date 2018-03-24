import { connect } from 'react-redux';
import ImagesPage from '../components/ImagesPage';
import { editImage } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
  isFetching: state.images.get('state').get('isFetching') || state.messages.get('state').get('isFetching'),
  images: state.images.get('images'),
  messages: state.messages.get('messages'),
});

// TODO: actually use dispatch here
const mapDispatchToProps = dispatch => ({
  markImageAsDone: i => (
    dispatch(editImage({ imageId: i, details: { markedAsCompleted: true } }))
  ),
  makeImageActive: i => (
    dispatch(editImage({ imageId: i, details: { markedAsCompleted: false } }))
  ),
  deleteImage: i => (
    dispatch(editImage({ imageId: i, details: { markedAsDeleted: true } }))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagesPage);
