import { connect } from 'react-redux';
import ConfirmEmailPage from '../../common-resources/ConfirmEmailPage';

import { confirmEmail } from '../actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  confirmEmail: id => dispatch(confirmEmail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailPage);
