import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'

import Sign from './components/sign.jsx'
import SignIn from './components/signIn.jsx'
import SignUp from './components/signUp.jsx'
import Main from './components/main.jsx'
import Blog from './components/Blog.jsx'

import store from "./store.jsx"
class App extends Component{
	render(){
		return(
			<div>
					<h1 
						onClick={()=> hashHistory.push('/')} 
						className='container'
						style={{cursor:'pointer'}}>Blog</h1>
				{this.props.children}
			</div>
		)
	}
}

render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={Main} />
				<Route path='signin' component={SignIn} />
				<Route path='signup' component={SignUp} />
				<Route path='blog' component={Blog} />
			</Route>
		</Router>
	</Provider>
	, root)