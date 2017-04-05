import { createStore, combineReducers, applyMiddleware } from 'redux'
import  logger  from 'redux-logger';
import user from './users/reducer/user';

export default createStore(combineReducers({
  user
}),
{},
applyMiddleware(logger()));