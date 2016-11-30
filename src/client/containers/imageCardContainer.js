import { connect } from 'react-redux';
import ImageCard from '../components/ImageCard';

const mapStateToProps = (state, ownProps) => {
  const im = state.grapheel.get('images')[ownProps.subID];
  const d = {
    imageUrl: im.imageUrl,
    message: im.message,
    replyCount: im.replyCount,
    tag: im.tag,
  };
  return d;
};

export default connect(mapStateToProps)(ImageCard);
