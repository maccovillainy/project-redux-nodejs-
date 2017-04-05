import React from 'react';
import { connect } from 'react-redux';
import  { findDOMNode } from 'react-dom'
import { Link } from 'react-router'
import  $  from 'jquery'

import { addName } from './action/user';
const queryString = require('query-string');
class User extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      url: ''
    }
  }
  login(){
    $.get({
      url: '/log?a=a'
    }).then(res => {
      console.log(res)
    this.props.addName('done!')
    })
  }
  componentDidMount(){
    this.setState({url: '/'+this.props.location.query.path})
  }
  render(){
    return(
      <div>
        <h1>hello crm</h1>
        <button onClick={()=>this.login()}>

          {this.props.user.name}
        </button>
        <Link href={this.state.url}>Go back</Link>
      </div>
    )
  }
}

const get = (state) => {
  return {
      user: state.user
  }
};
const set = (dispatch) => {
  return {
    addName: (name) => {
      dispatch(addName(name))
    }
  }
};
export default connect(get,set)(User);