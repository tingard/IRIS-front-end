import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';

const mapStateToProps = (state) => {
  const r = ({
    user: state.user,
  });
  return r;
};

// TODO: mapDispatchToProps

export default connect(mapStateToProps)(ProfilePage);
