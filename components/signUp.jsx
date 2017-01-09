import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'

export default class SignUp extends Component {
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
		}).then(res => console.log(res))
	}
	render(){
		return (
			<div>
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
