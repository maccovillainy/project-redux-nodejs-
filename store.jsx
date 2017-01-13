import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import signed from './redusers/signed.jsx'
import register from './redusers/register.jsx'
import ENDend from './redusers/end.jsx'
import content from './redusers/content.jsx'
import blog from './redusers/blog.jsx'

export default createStore(
	combineReducers({
		signed,
    register,
    ENDend,
    content,
    blog
	}),
	{},
	applyMiddleware(thunk)
)