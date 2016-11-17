import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation/Navigation';
import './main.css';

class MainContainer extends Component {
  render() {
    return (
      <div className="main">
        <Navigation 
          isAuthenticated={ this.props.isAuthenticated }/>
        {this.props.children}
      </div>
    )
  }
}

MainContainer.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps({ user }) {
  return {
    isAuthenticated: user.get('isAuthenticated')
  }
}

export default connect(
  mapStateToProps
)(MainContainer);
