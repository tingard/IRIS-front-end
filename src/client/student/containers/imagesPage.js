import { connect } from 'react-redux';
import ImagesPage from '../components/ImagesPage';

const mapStateToProps = state => ({
  user: state.user,
  isStale: state.images.get('isStale') || state.messages.get('isStale'),
  isFetching: state.images.get('isFetching') || state.messages.get('isFetching'),
  images: state.images.get('images'),
  messages: state.messages.get('messages'),
});

// TODO: actually use dispatch here
const mapDispatchToProps = () => ({
  markImageAsDone: (i) => { console.log('Marking as done:', i); },
  deleteImage: (i) => { console.log('Deleting image:', i); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagesPage);
