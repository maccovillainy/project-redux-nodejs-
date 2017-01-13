import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { hashHistory } from 'react-router'

import { connect } from 'react-redux'
import { goSigned } from '../actions/sign.jsx'



class SignIn extends Component {
	onSend(e){
		e.preventDefault()
		let name = ReactDOM.findDOMNode(this.refs.name).value
		$.ajax({
			method: 'POST',
			url: '/verifyin',
			data:{
				name: name,
				pass: ReactDOM.findDOMNode(this.refs.pass).value
			}
		}).then(res => {
			this.props.goSigned(res, name)
		})
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.verify.sign) hashHistory.push('/')
	}
	render(){
		console.log(this.props.verify.sign)
		let data;
		switch (this.props.verify.sign){
			case null: data = '';break;
			case false:data =  <p className='text-danger'>Wrong login or password!</p>;break;
			case true:data =  'sign success';break;
		}
		return (
			<div>
				{data}
				<div className="container">
				  <form>
				    <div className="form-group row">
				      <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
				      <div className="col-sm-10">
				        <input ref='name'  type="email" className="form-control" id="inputEmail3" placeholder="Name" />
				      </div>
				    </div>
				    <div className="form-group row">
				      <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
				      <div className="col-sm-10">
				        <input ref='pass'  type="password" className="form-control" id="inputPassword3" placeholder="Password" />
				      </div>
				    </div>
				    <div className="form-group row">
				      <div className="offset-sm-2 col-sm-10">
				        <button onClick={(e)=> this.onSend(e)} type="submit" className="btn btn-primary">Sign in</button>
				      </div>
				    </div>
				  </form>
				</div>
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
		goSigned: (bul, name) => {
			dispatch(goSigned(bul, name))
		}
	}
}

export default connect(mapState, mapDispatch)(SignIn)

/*

let arr = [
	{
		id:1,
		w:3,
		h:4
	},
	{
		id:2,
		w:3,
		h:5
	},
	{
		id:3,
		w:2,
		h:5
	},
	{
		id:4,
		w:4,
		h:6
	},
	{
		id:5,
		w:200,
		h:400
	},
	{
		id:6,
		w:400,
		h:200
	}
]
let res;
const getImage = (w,h) => {
	let k = w/h,
	area = w*h;
	let prev = 0;
	if (k>1){
		res = arr.filter(item => {
			let space = item.w * item.h;
			if (item.w/item.h > 1) {
				if(Math.abs(area - space) < Math.abs(area - prev)){
					prev = space
					return item			
				}
			}
		})
	}else if(k<1){

	}else{

	}
	return res
}
getImage(500,25)
console.log(prev)
*/

/*


let arr = [
	{
		id:1,
		w:3,
		h:4
	},
	{
		id:2,
		w:3,
		h:5
	},
	{
		id:3,
		w:2,
		h:5
	},
	{
		id:4,
		w:4,
		h:6
	}
]

let pics = []
let aa = [];

const getImage = (w,h) => {
	arr.forEach(item => {
		pics.push({
			res:Math.abs(item.w - w) + Math.abs(item.h - h),
			id: item.id
		})	
	})
	console.log(pics)
	aa = pics.reduce((cur, next) => {
		if(cur.res <= next.res) return cur
		else return next
	})
	console.log(aa)
}

getImage(4,5)
*/