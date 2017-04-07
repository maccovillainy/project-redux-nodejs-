import React, {Component} from 'react';
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirmPas: '',
      email: ''
    }
  }

  signUp() {
    console.log('here',console.log(this.state))
    axios.put('http://localhost:1337/user', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }).then(res => {
      this.setState({
        username: '',
        password: '',
        confirmPas: '',
        email: ''
      });
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
            <div className="col-md-6">
              <div className="card mx-2">
                <div className="card-block p-2">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <div className="input-group mb-1">
                    <span className="input-group-addon"><i className="icon-user"></i></span>
                    <input
                      value={this.state.username}
                      onChange={(e)=>this.setState({username: e.target.value})}
                      type="text"
                      className="form-control"
                      placeholder="Username"/>
                  </div>

                  <div className="input-group mb-1">
                    <span className="input-group-addon">@</span>
                    <input
                      value={this.state.email}
                      onChange={(e)=>this.setState({email: e.target.value})}
                      type="text"
                      className="form-control"
                      placeholder="Email"/>
                  </div>

                  <div className="input-group mb-1">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input
                      value={this.state.password}
                      onChange={(e)=>{ this.setState({password: e.target.value})}}
                      type="password"
                      className="form-control"
                      placeholder="Password"/>
                  </div>

                  <div className="input-group mb-2">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input value={this.state.confirmPas}
                           onChange={(e)=>this.setState({confirmPas: e.target.value})}
                           type="password"
                           className="form-control"
                           placeholder="Repeat password"/>
                  </div>

                  <button onClick={() => this.signUp()} type="button" className="btn btn-block btn-success">Create
                    Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
