import React, { Component, PropTypes } from 'react';
import './main.css';

class MainContainer extends Component {
  render() {
    return (
      <div className="main">
        <nav>
          <div className="navBar">
            <a href="/" className="item" role="link" tabIndex="1">Home</a>
            <a href="#" className="item" role="link" tabIndex="2">Search</a>
            <a href="#" className="item" role="link" tabIndex="3">Category</a>
      
            <a href="#" className="item right" tabIndex="7" role="link">Sign in</a>
            <a href="#" className="item right" tabIndex="6" role="link">Sign up</a>
            <a href="#" className="item right" tabIndex="5" role="link">Sign out</a>
            <a href="#" className="item right" tabIndex="4" role="link">Account</a>
          </div>
        </nav>

        {this.props.children}
      </div>
    )
  }
}

export default MainContainer;