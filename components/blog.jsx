import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setData } from '../actions/sign.jsx'
 class Blog extends Component{
	componentWillMount() {
		console.log(this.props.params.name)
		$.ajax({
			method: 'post',
			url: 'getblog',
			data:{
				name:this.props.params.name
			}
		}).then(res => {
			this.props.setData(res)
		}).catch(err => console.log(err))
		
	}
	render(){
		console.log(this.props.data)
		console.log(Object.keys(this.props.data).length)
		let data;
		if(Object.keys(this.props.data).length)
			data = (
				<article >
			    <h4 >{this.props.data.name}</h4>
				  <img  src="http://placehold.it/400x600" alt="Card image cap" />
			    <p >{this.props.data.text}</p>
			    <blockquote>{this.props.data.author}</blockquote>
			    <p>{this.props.data.date}</p>
				</article>
			)
		return(
			<main className='container' >
				{data}
			</main>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.blog.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setData: (data) => {
			dispatch(setData(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);