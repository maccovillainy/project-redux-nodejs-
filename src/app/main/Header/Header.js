import React, { Component } from 'react';
import { Link } from 'react-router'
class Header extends Component {

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }



  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler hidden-lg-up" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        <ul className="nav navbar-nav hidden-md-down ">
          <li className="nav-item">
            <a className="nav-link navbar-toggler sidebar-toggler" onClick={this.sidebarToggle} href="#">&#9776;</a>
          </li>
          <li className="nav-item px-1">
            <Link className="nav-link" to="/">Home</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav hidden-md-down ml-auto">
          <li className="nav-item px-1">
            <Link className="nav-link" to="/login">Sign ip</Link>
          </li>
          <li className="nav-item px-1">
            <Link className="nav-link" to="/register">Sign up</Link>
          </li>
        </ul>
      </header>
    )
  }
}

export default Header;
