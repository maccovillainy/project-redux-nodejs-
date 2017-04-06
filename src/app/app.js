import React from 'react';
import  {findDOMNode} from 'react-dom'
import {Link} from 'react-router'
import Header from './main/Header/Header'
import Sidebar from './main/Sidebar/Sidebar'
import Footer from './main/Footer/Footer'

export default class App extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <main className="main">
            <div className="container-fluid">
              {this.props.children}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    )
  }
}

