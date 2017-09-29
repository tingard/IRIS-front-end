import { connect } from 'react-redux';
import CardPage from '../components/CardPage';

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return ({
    card: state.cards.toArray().filter(c => c.id === ownProps.match.params.cardId)[0],
    user: state.user.toObject(),
  });
};

export default connect(mapStateToProps)(CardPage);
