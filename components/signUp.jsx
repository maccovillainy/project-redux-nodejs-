import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'

import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import { register } from '../actions/sign.jsx'

class SignUp extends Component {
	onSubmit(e){
		e.preventDefault();

		let name = ReactDOM.findDOMNode(this.refs.name).value,
		pass = ReactDOM.findDOMNode(this.refs.pass).value,
		cPass = ReactDOM.findDOMNode(this.refs.cPass).value,
		email = ReactDOM.findDOMNode(this.refs.email).value;
		$.ajax({
			method: 'post',
			url: '/register',
			data:{
				name,
				pass,
				cPass,
				email
			}
		}).then(res => {
			console.log(res.register)
			let existName = false,
				existEmail = false,
				nameInalid = false,
				passInvalid = res.password,
				errors  = res.body,
				reg = res.register;
				this.props.register(existName, existEmail, nameInalid, passInvalid, errors,reg)
		})
	}
	componentWillReceiveProps(nextProps) {
		//console.log(nextProps)
	}
	render(){
					let data = [], pass = '', success = '';
					if (this.props.verify.errors){
						data = this.props.verify.errors.map((item, i) => (
													<div key={i}>
														<p>
															<strong className='text-danger' >{item.param}: </strong>
															<em className='text-danger' >{item.msg}</em>
														</p>
													</div>))
				}
				if (this.props.verify.passInvalid){
					pass = <strong className='text-danger' >incorrect data password</strong>
				} 
				console.log(this.props.verify.register)
				if (this.props.verify.register){
					success = <p className='text-syccess'>Registration success! We send verify message on your e-mail, please go to verify link in this message</p>
					setTimeout(() => {
						this.props.register(false,false,false,false,false)
						hashHistory.push('/')
					}, 3000)
				}
		return (
			<div>
				{data}
				{pass}
				{success}
				<div className="container">
				  <form>
				    <div className="form-group row">
				      <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">login</label>
				      <div className="col-sm-10">
				        <input ref='name' type="email" className="form-control" id="inputEmail3" placeholder="login" />
				      </div>
				    </div>
				    <div className="form-group row">
				      <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">e-mail</label>
				      <div className="col-sm-10">
				        <input ref='email' type="email" className="form-control" id="inputEmail3" placeholder="e-mail" />
				      </div>
				    </div>
				    <div className="form-group row">
				      <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
				      <div className="col-sm-10">
				        <input ref='pass' type="password" className="form-control" id="inputPassword3" placeholder="Password" />
				      </div>
				    </div>
				    <div className="form-group row">
				      <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">confirm password</label>
				      <div className="col-sm-10">
				        <input ref='cPass' type="password" className="form-control" id="inputPassword3" placeholder="confirm password" />
				      </div>
				    </div>
				    <div className="form-group row">
				      <div className="offset-sm-2 col-sm-10">
				        <button onClick={(e)=>this.onSubmit(e)} type="submit" className="btn btn-primary">Sign in</button>
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
		verify: state.register
	}
}

const mapDispatch = (dispatch) => {
	return {
		register: (existName, existEmail, nameInalid, passInvalid, errors, reg) => {
			dispatch(register(existName, existEmail, nameInalid, passInvalid, errors, reg))
		}
	}
}

export default connect(mapState, mapDispatch)(SignUp)