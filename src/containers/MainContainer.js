import React, { Component, PropTypes } from 'react';
import './main.css';

class MainContainer extends Component {
  render() {
    return (
      <div className="main">
        <h1>Hello</h1>
        {this.props.children}
      </div>
    )
  }
}

export default MainContainer;