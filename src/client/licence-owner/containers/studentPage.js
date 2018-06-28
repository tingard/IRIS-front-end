import { connect } from 'react-redux';
import StudentPage from '../components/StudentPage';
// import { uploadImage, getImages } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const licences = state.user.get('licences').filter(
    licence => licence.get('_id') === ownProps.match.params.licenceId,
  );
  return ({
    state: state.user.get('state'),
    student: licences.size > 0 ? licences.get(0).get('student') : null,
  });
};

export default connect(mapStateToProps)(StudentPage);
