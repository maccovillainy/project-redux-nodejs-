import { createStore, combineReducers, applyMiddleware } from 'redux'
import  logger  from 'redux-logger';
import thunk from 'redux-thunk';
import user from './src/app/main/users/reducer/user';

export default createStore(combineReducers({
  user
}),
{},
applyMiddleware(logger(), thunk));