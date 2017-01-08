import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Content extends Component{
	render(){
		return(
			<main className='container' >
				<div className='row'>
					<div className="card col-md-3" >
						<div className="card" >
						  <img style={{height: 200}} className="card-img-top" src="http://placehold.it/400x600" alt="Card image cap" />
						  <div className="card-block">
						    <h4 className="card-title">Card title</h4>
						    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
						    <Link to="/blog" className="btn btn-primary">Go somewhere</Link>
						  </div>
						</div>
					</div>
					<div className="card col-md-3" >
						<div className="card" >
						  <img style={{height: 200}} className="card-img-top" src="http://placehold.it/400x600" alt="Card image cap" />
						  <div className="card-block">
						    <h4 className="card-title">Card title</h4>
						    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
						    <Link to="/blog" className="btn btn-primary">Go somewhere</Link>
						  </div>
						</div>
					</div>
					<div className="card col-md-3" >
						<div className="card" >
						  <img style={{height: 200}} className="card-img-top" src="http://placehold.it/400x600" alt="Card image cap" />
						  <div className="card-block">
						    <h4 className="card-title">Card title</h4>
						    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
						    <Link to="/blog" className="btn btn-primary">Go somewhere</Link>
						  </div>
						</div>
					</div>
					<div className="card col-md-3" >
						<div className="card" >
						  <img style={{height: 200}} className="card-img-top" src="http://placehold.it/400x600" alt="Card image cap" />
						  <div className="card-block">
						    <h4 className="card-title">Card title</h4>
						    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
						    <Link to="/blog" className="btn btn-primary">Go somewhere</Link>
						  </div>
						</div>
					</div>
				</div>
			</main>
		)
	}
}

