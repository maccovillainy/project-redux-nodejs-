import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { hashHistory } from 'react-router'

import { connect } from 'react-redux'
import { goSigned } from '../actions/sign.jsx'



class SignIn extends Component {
	onSend(e){
		e.preventDefault()
		$.ajax({
			method: 'POST',
			url: '/verifyin',
			data:{
				name: ReactDOM.findDOMNode(this.refs.name).value,
				pass: ReactDOM.findDOMNode(this.refs.pass).value
			}
		}).then(res => {
			this.props.goSigned(res)
		})
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.sign.sign) hashHistory.push('/')
	}
	render(){
		return (
			<div>
				<div className="container">
				  <form>
				    <div className="form-group row">
				      <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
				      <div className="col-sm-10">
				        <input ref='name'  type="email" className="form-control" id="inputEmail3" placeholder="Name" />
				      </div>
				    </div>
				    <div className="form-group row">
				      <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
				      <div className="col-sm-10">
				        <input ref='pass'  type="password" className="form-control" id="inputPassword3" placeholder="Password" />
				      </div>
				    </div>
				    <div className="form-group row">
				      <div className="offset-sm-2 col-sm-10">
				        <button onClick={(e)=> this.onSend(e)} type="submit" className="btn btn-primary">Sign in</button>
				      </div>
				    </div>
				  </form>
				</div>
			</div>
		)
	}
}

const mapState = (state) => {
	return {
		sign: state.signed
	}
}

const mapDispatch = (dispatch) => {
	return {
		goSigned: (bul) => {
			dispatch(goSigned(bul))
		}
	}
}

export default connect(mapState, mapDispatch)(SignIn)