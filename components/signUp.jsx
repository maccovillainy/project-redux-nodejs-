import React, { Component } from 'react'
import { render } from 'react-dom'

const SignUp = () => {
	return (
		<div>
			<div className="container">
			  <form>
			    <div className="form-group row">
			      <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">login</label>
			      <div className="col-sm-10">
			        <input type="email" className="form-control" id="inputEmail3" placeholder="login" />
			      </div>
			    </div>
			    <div className="form-group row">
			      <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">e-mail</label>
			      <div className="col-sm-10">
			        <input type="email" className="form-control" id="inputEmail3" placeholder="e-mail" />
			      </div>
			    </div>
			    <div className="form-group row">
			      <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
			      <div className="col-sm-10">
			        <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
			      </div>
			    </div>
			    <div className="form-group row">
			      <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">confirm password</label>
			      <div className="col-sm-10">
			        <input type="password" className="form-control" id="inputPassword3" placeholder="confirm password" />
			      </div>
			    </div>
			    <div className="form-group row">
			      <div className="offset-sm-2 col-sm-10">
			        <button type="submit" className="btn btn-primary">Sign in</button>
			      </div>
			    </div>
			  </form>
			</div>
		</div>
	)
}

export default SignUp