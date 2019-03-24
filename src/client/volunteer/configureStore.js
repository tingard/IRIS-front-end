/* eslint-disable global-require */
import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';
import cardReducer from './reducers/cardReducer';

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({
      user: userReducer,
      cards: cardReducer,
      messages: messageReducer,
    }),
    initialState,
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(
      ['./reducers/userReducer', './reducers/messageReducer', './reducers/cardReducer'],
      () => {
        const nextRootReducer = combineReducers({
          user: userReducer,
          cards: cardReducer,
          messages: messageReducer,
        });
        store.replaceReducer(nextRootReducer);
      },
    );
  }

  return store;
}
