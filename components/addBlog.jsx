import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import { setErrors } from '../actions/sign.jsx'
class  AddBlock extends Component{
  add(e){
    e.preventDefault(); 
    let file = this.refs.file.files[0]
    var data = new FormData();
    data.append( 'image', file );
    data.append( 'name', ReactDOM.findDOMNode(this.refs.name).value );
    data.append( 'text', ReactDOM.findDOMNode(this.refs.text).value );
    if(file)
    $.post({
      url: '/upload',
      processData: false,
      contentType: false,
      data
    }).then(res => {
      console.log(res)
      console.log(res.bul === false)
      if (res.bul === false){
        alert(res.msg)  
      }else{
        if (res.exist === false){
          this.props.setErrors(res.errors, false)
          if (!res.errors.length){
            setTimeout(()=>{
              this.props.setErrors([], false)
              hashHistory.push('/')
            },3000)
          }
        }else {
          this.props.setErrors(false, true)
          console.log('a')
        }
      }

    }).catch(err => console.log(err))
    
  }
  render(){
    let data;
    console.log(this.props.blogErrors)
    if (this.props.blogErrors.errors.length){
      data = this.props.blogErrors.errors.map((item, i) => (
          <p key={i}>
            <strong className='text-danger'>{item.param}: </strong> 
            <em className='text-danger'>{item.msg}</em>
          </p>
        ))
    }else if (this.props.blogErrors.errors === false){
      data = '';
    }else{
      data = <p className='text-success'>Blog is added</p>
    }
    return(
      <div className='container'>
        {this.props.blogErrors.exist ? <p className="text-danger">blog exist</p> : ''}
        {data}
        <form>
          <div className="form-group">
            <label htmlFor="Name">Name of your article</label>
            <input ref='name' type="text" className="form-control" id="Name" aria-describedby="emailHelp" placeholder="Name of your article" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleTextarea">Text of your article</label>
            <textarea ref='text' className="form-control" id="exampleTextarea" rows="15"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputFile">File input</label>
            <input  ref='file' type="file" className="form-control" required accept="image/*" id="fieldPhoto"  multiple name="photo" />
            <small id="fileHelp" className="form-text text-muted">Choose picture htmlFor blog</small>
          </div>
          <button onClick={(e)=> this.add(e)} type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

const State = (state) => {
  return {
    blogErrors: state.blogErrors
  }
}

const Dispatch = (dispatch) => {
  return {
    setErrors: (err, ex) => {
      dispatch(setErrors(err, ex))
    }
  }
}

export default connect(State, Dispatch)(AddBlock)