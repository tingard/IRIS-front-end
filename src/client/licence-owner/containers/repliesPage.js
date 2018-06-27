import { connect } from 'react-redux';
import RepliesPage from '../components/RepliesPage';
// import { uploadImage, getImages } from '../actions';

const mapStateToProps = (state, ownProps) => {
  // console.log(JSON.stringify(state.images.get('images')));
  const images = state.images.get('images').filter(im => im.get('_id') === ownProps.match.params.imageId);
  return Object.assign(
    { image: images.size > 0 ? images.get(0) : null, state: state.images.get('state') },
    ownProps,
  );
};

export default connect(mapStateToProps)(RepliesPage);
