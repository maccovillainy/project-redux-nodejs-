import React, { Component } from 'react'
import ReactDOM from 'react-dom'
export default class  AddBlock extends Component{
  add(e){
    e.preventDefault(); 
    //let files = ReactDOM.findDOMNode(this.refs.file).value
    let file = this.refs.file.files[0]
    console.log(file)
    //data-url="/upload"
/*    $('#fieldPhoto' ).fileupload({
        dataType: 'json',
        add: function(e, data){
          console.log(data.data)
          $.ajax({
            method: 'post',
            url: '/upload',
            data
          })
        }
        })
*/
    console.log(typeof file)
    var data = new FormData();
    data.append( 'image', file );

    $.post({
      url: '/upload',
      processData: false,
      contentType: false,
      data
    }).then(res => {
      console.log(res)

      let name = ReactDOM.findDOMNode(this.refs.name).value,
      text = ReactDOM.findDOMNode(this.refs.text).value,
      date = new Date(),
      pic = res;
        $.ajax({
        method: 'post', 
        url:'/addnewblog',
        data:{
          name,text,date,pic
        }
      }).then(res => console.log(res))
      .catch(err => console.log(err))
    })
    
  }
  render(){
    return(
      <div className='container'>
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