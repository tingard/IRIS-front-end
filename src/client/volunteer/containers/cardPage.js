import { connect } from 'react-redux';
import CardPage from '../components/CardPage';

const mapStateToProps = (state, ownProps) => ({
  card: state.cards.get('cards').filter(
    c => c.get('id') === ownProps.match.params.cardId,
  ).get(0),
  user: state.user,
});

export default connect(mapStateToProps)(CardPage);
