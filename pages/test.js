import React from 'react';
import  { findDOMNode } from 'react-dom'
import { Link } from 'react-router'
const queryString = require('query-string');
    //console.log(111,location.search);


export default class App extends React.Component{
  constructor(props){
    super(props)

  }
  componentWillMount(){

  }
  componentDidMount(){
   // console.log(111,location.search);
  }
  render(){
    return(
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consequatur corporis culpa delectus deleniti dignissimos ea eius, ex facilis incidunt, laborum nesciunt nihil nisi numquam perspiciatis provident rem sint ullam unde vero! Amet blanditiis, cupiditate id iste mollitia perferendis quo! Accusamus alias animi aperiam architecto asperiores assumenda aut blanditiis cumque cupiditate dicta distinctio ducimus ea error est expedita facilis fuga in incidunt ipsum magnam maxime necessitatibus, nihil odio perferendis provident quasi repudiandae sed sequi sint sit sunt, vero voluptatibus voluptatum?
      </div>
    )
  }
}

