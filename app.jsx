import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'

import Sign from './components/sign.jsx'
import SignIn from './components/signIn.jsx'
import SignUp from './components/signUp.jsx'
import Main from './components/main.jsx'
import Blog from './components/blog.jsx'
import EndOfReg from './components/EndOfReg.jsx'
import AddBlog from './components/addBlog.jsx'

import store from "./store.jsx"
class App extends Component{
	render(){
		return(
			<div className='container'>
				<h1 
					onClick={()=> hashHistory.push('/')} 
					className='d-inline-block'
					style={{cursor:'pointer'}}>
					letBlog</h1>
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
				<Route path='user/:id' component={EndOfReg} />
				<Route path='addblog' component={AddBlog} />
			</Route>
		</Router>
	</Provider>
	, root)