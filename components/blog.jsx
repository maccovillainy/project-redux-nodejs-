import React, { Component } from 'react'

export default class Blog extends Component{
	componentWillMount() {
		console.log(this.props.params.name)
		$.ajax({
			method: 'post',
			url: 'getblog',
			data:{
				name:this.props.params.name
			}
		}).then(res => {
			console.log(res)
		}).catch(err => console.log(err))
		
	}
	render(){
		return(
			<main className='container' >
				<div className='row'>
				  <img  src="http://placehold.it/400x600" alt="Card image cap" />
			    <h4 >Card title</h4>
			    <p >Some quick example text to build on the card title and make up the bulk of the cards content.</p>
				</div>
			</main>
		)
	}
}

