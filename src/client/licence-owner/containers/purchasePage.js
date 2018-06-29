import { connect } from 'react-redux';
import PurchasePage from '../components/PurchasePage';
import { getUserDetails, purchaseLicence } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
  images: state.images,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  purchaseLicence: () => dispatch(purchaseLicence()).then(() => dispatch(getUserDetails())).then(() => ownProps.history.push('/licence-owner')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePage);
