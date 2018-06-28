import { connect } from 'react-redux';
import PurchasePage from '../components/PurchasePage';
import { purchaseLicence } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
  images: state.images,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  purchaseLicence: () => dispatch(purchaseLicence()).then(() => ownProps.history.push('/licence-owner')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePage);
