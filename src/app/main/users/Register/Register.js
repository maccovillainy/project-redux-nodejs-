import React, {Component} from 'react';
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        login: '',
        pass: '',
        confirmPas: '',
        email: ''
      }
    }
  }

  signUn() {
    console.log('here')
    axios.put('http://localhost:1337/user', {
      username: '3anyna',
      password: '6o6pa',
      email: '3ni3DbI@mail.ru'
    }).then(res => {
      console.log(1111, res.data)
    })
      .catch(err => {
        console.log(222, err)
      })
  }

  render() {
    console.log(this.state.data)
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
                    <input onChange={(e)=>this.setState({
                      ...this.state.data,
                      username: e.target.value
                    })} type="text" className="form-control" placeholder="Username"/>
                  </div>

                  <div className="input-group mb-1">
                    <span className="input-group-addon">@</span>
                    <input onChange={(e)=>this.setState({
                      ...this.state.data,
                      email: e.target.value
                    })} type="text" className="form-control" placeholder="Email"/>
                  </div>

                  <div className="input-group mb-1">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input value={this.state.data.pass} onChange={(e)=>{
                    console.log(e.target.value)
                    this.setState({
                    data:{
                      ...this.state.data,
                      pass: e.target.value
                    }
                    })
                    }} type="password" className="form-control" placeholder="Password"/>
                  </div>

                  <div className="input-group mb-2">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input onChange={(e)=>this.setState({
                      ...this.state.data,
                      confirmPas: e.target.value
                    })} type="password" className="form-control" placeholder="Repeat password"/>
                  </div>

                  <button onClick={() => this.signUn()} type="button" className="btn btn-block btn-success">Create
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
