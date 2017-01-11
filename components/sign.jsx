import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, Link } from 'react-router'
import { connect } from 'react-redux'

import { signOut } from '../actions/sign.jsx'

class Sign extends Component {
	render(){
    let data;
    if(this.props.verify.sign){
      data = (
      <div className='container clearfix'>
        <div className='row align-items-center  justify-content-end'> 
          <h2>Welcome, {this.props.verify.name}! </h2>
          <button onClick={() => this.props.signOut()} className='btn btn-secondary btn-sm ml-2'>SIGN OUT</button>
        </div>
            <Link className='btn btn-info m-3 float-right' to='/addblog'>add new blog</Link>
      </div>
      )
    }else{
      data = (
        <div className='row align-items-center justify-content-end'>
          <Link to='/signin'>Sign in</Link>/<Link to='/signup'>Sig up</Link>
        </div>
      )
    }
		return (
      <div>
        {data}
      </div>
      )
	}
}


const mapState = (state) => {
  return {
    verify: state.signed
  }
}

const mapDispatch = (dispatch) => {
  return {
    signOut: (bul) => {
      dispatch(signOut(bul))
    }
  }
}

export default connect(mapState, mapDispatch)(Sign)
