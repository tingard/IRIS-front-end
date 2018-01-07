import { connect } from 'react-redux';
import ImagesPage from '../components/ImagesPage';

const mapStateToProps = state => ({
  user: state.user,
  images: state.images.get('images'),
});

// TODO: actually use dispatch here
const mapDispatchToProps = () => ({
  markImageAsDone: (i) => { console.log('Marking as done:', i); },
  deleteImage: (i) => { console.log('Deleting image:', i); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagesPage);
