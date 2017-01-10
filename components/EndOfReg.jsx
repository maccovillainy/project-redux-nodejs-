import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'

import { end } from '../actions/sign.jsx'

 class EndOfReg extends React.Component{
  componentWillMount() {
    $.ajax({
      method: 'put',
      url: '/andOfReg',
      data: {url:this.props.params.id}
    }).then(res => {
        this.props.end(res)
    })
  }
  render(){
    console.log(this.props.params.id)
    console.log(this.props.verify.finish)
    return(
      <div>
        {this.props.verify.finish ? 
          <p className='text-success'>Registation complete </p> : 
          <p className='text-danger'>Registation false </p>}
      </div>
    )
  }
}



const mapState = (state) => {
  return {
    verify: state.ENDend
  }
}

const mapDispatch = (dispatch) => {
  return {
    end: (bul) => {
      dispatch(end(bul))
    }
  }
}

export default connect(mapState, mapDispatch)(EndOfReg)