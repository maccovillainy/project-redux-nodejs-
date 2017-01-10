import {createStore, combineReducers, applyMiddleware} from 'redux'

import signed from './redusers/signed.jsx'
import register from './redusers/register.jsx'
import ENDend from './redusers/end.jsx'
import thunk from 'redux-thunk'

export default createStore(
	combineReducers({
		signed,
    register,
    ENDend
	}),
	{},
	applyMiddleware(thunk)
)