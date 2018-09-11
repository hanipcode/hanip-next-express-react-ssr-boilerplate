import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';

import reducers from './ducks';

const makeConfiguredStore = (reducers, initialState) => createStore(reducers, initialState, applyMiddleware(logger));

export default (initialState, {
  isServer, req, debug, storeKey,
}) => {
  if (isServer) {
    return makeConfiguredStore(reducers, initialState);
  }
  const { persistStore, persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'rootApp',
    whitelist: ['userState'],
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, reducers);
  const store = makeConfiguredStore(persistedReducer, initialState);
  // eslint-disable-next-line
  store.__persistor = persistStore(store);
  return store;
};
