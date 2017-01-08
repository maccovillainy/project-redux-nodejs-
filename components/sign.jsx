import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, Link } from 'react-router'

class Sign extends Component {
	render(){
		return (
					<div className='row justify-content-end'>
						<Link to='/signin'>SignIn</Link>/<Link to='/signup'>SignUp</Link>
					</div>
		)
	}
}

export default Sign