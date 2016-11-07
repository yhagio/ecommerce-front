import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Navigation from '../components/Navigation';
import './main.css';

class MainContainer extends Component {
  render() {
    return (
      <div className="main">
        <Navigation />
        {this.props.children}
      </div>
    )
  }
}

export default MainContainer;