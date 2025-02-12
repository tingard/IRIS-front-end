import { connect } from 'react-redux';
import HomePage from '../components/HomePage';

const mapStateToProps = state => ({
  cards: state.cards.merge({
    cards: state.cards.get('cards').filter(
      c => !state.messages.get('messages').map(
        m => m.get('image').get('_id') === c.get('_id'),
      ).some(i => i),
    ).filter(
      c => !state.messages.get('pendingMessages').map(
        m => m.get('imageId') === c.get('_id'),
      ).some(i => i),
    ),
  }),
  user: state.user,
  messages: state.messages,
});

export default connect(mapStateToProps)(HomePage);
