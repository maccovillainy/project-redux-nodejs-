import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import Sign from './sign.jsx'
import SignIn from './signIn.jsx'
import Content from './Content.jsx'

export default class Main extends Component{
	render(){
		return(
			<section >
				<header className='container'>
					<Sign />
				</header>
				<Content />
			</section>
		)
	}
}

