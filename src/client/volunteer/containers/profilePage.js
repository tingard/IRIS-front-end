import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';

const mapStateToProps = (state) => {
  const r = ({
    user: state.user.toObject(),
  });
  return r;
};

// TODO: mapDispatchToProps

export default connect(mapStateToProps)(ProfilePage);
