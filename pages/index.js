import React from 'react';
import  { findDOMNode } from 'react-dom'
import { Link } from 'react-router'


export default class App extends React.Component{
  constructor(props){
    super(props)

  }
  render(){
    return(
      <div>
        <Link href="/">home | </Link>
        <Link href="/login">Login |</Link>
        <Link href="/content">content | </Link>
        <Link href="/ul">list</Link>
        {this.props.children}
      </div>
    )
  }
}

