import {createStore, combineReducers, applyMiddleware} from 'redux'

import signed from './redusers/signed.jsx'
import thunk from 'redux-thunk'

export default createStore(
	combineReducers({
		signed
	}),
	{},
	applyMiddleware(thunk)
)