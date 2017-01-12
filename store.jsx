import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import signed from './redusers/signed.jsx'
import register from './redusers/register.jsx'
import ENDend from './redusers/end.jsx'
import content from './redusers/content.jsx'

export default createStore(
	combineReducers({
		signed,
    register,
    ENDend,
    content
	}),
	{},
	applyMiddleware(thunk)
)