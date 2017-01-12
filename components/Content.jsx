import React, { Component } from 'react'
import { Link } from 'react-router'


import { connect } from 'react-redux'
import { getData } from '../actions/sign.jsx'
import Blog  from './blog.jsx'

class Content extends Component{
	componentWillMount() {
		$.ajax({url:'getcontent'}).then(res => {
			this.props.getData(res)
		}).catch(err => console.log(err))
	}
	render(){
		let blogs;
		if (this.props.data.length){
				blogs = this.props.data.map(item => {
					let link = "/blog/"+item.name;
					return (
						<div key={item._id} style={{border: 0}} className="card col-md-3 " >
							<div className="card" >
							  <img style={{height: 200}} className="card-img-top" src="http://placehold.it/400x600" alt="Card image cap" />
							  <div className="card-block">
							    <h4 className="card-title">{item.name}</h4>
							    <p className="card-text">{item.text.substring(0,30)}...</p>
							    <Link to={link} className="btn btn-primary">Read more..</Link>
							  </div>
							</div>
						</div>
					)
				})
		}else{
			blogs = 'Блогов еще нет'
		}
		return(
			<main className='container' >
				<div className='row'>
					{blogs}
				</div>
			</main>
		)
	}
}

const mapState = (state) => {
	return {
		data: state.content.data
	}
}

const mapDispatch = (dispatch) => {
	return {
		getData: (data) => {
			dispatch(getData(data))
		}
	}
}

export default connect(mapState, mapDispatch)(Content)