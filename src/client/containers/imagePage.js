import { connect } from 'react-redux';
import ImageDetails from '../components/ImageDetails';

const mapStateToProps = (state, ownProps) => ({
  image: Object.assign({}, state.submissions.get(ownProps.routeParams.imageID)),
  imageID: parseInt(ownProps.routeParams.imageID, 10),
});

const mapDispatchToProps = dispatch => ({
  sendReply: (reply, imageID) => {
    dispatch({ type: 'reply-image', reply, imageID });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetails);
