import React, {Component} from 'react';
import {Link} from 'react-router'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        password: ''
    }
  }

  signIn() {
    axios.post('http://localhost:1337/user/login', {
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      console.log(1111, res.data)
      this.setState({
        username: '',
        password: ''})
    })
      .catch(err => {
        console.log(222, err)
      })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-2">
                  <div className="card-block">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <div className="input-group mb-1">
                      <span className="input-group-addon"><i className="icon-user"></i></span>
                      <input
                        value={this.state.username}
                        onChange={(e) => this.setState({username: e.target.value})}
                        type="text"
                        className="form-control"
                        placeholder="Username"
                      />
                    </div>
                    <div className="input-group mb-2">
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input
                        value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button onClick={() => this.signIn()} type="button" className="btn btn-primary px-2">Login
                        </button>
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-link px-0">Forgot password?</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-inverse card-primary py-3 hidden-md-down" style={{ width: 44 + '%' }}>
                  <div className="card-block text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to={'/register'} type="button" className="btn btn-primary active mt-1">Register Now!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
