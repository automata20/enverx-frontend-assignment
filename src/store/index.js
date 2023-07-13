import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import user from './user';
import transaction from './transaction';

const reducer = combineReducers({
  // here we will be adding reducers
  user,
  transaction
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;
