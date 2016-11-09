import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Signout from '../components/Signout';
import { signoutUser } from '../redux/User';

class SignoutContainer extends Component{
  componentDidMount() {
    this.props.dispatch(signoutUser());
  }

  render() {
    return (
      <Signout />
    );
  }
}

SignoutContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(SignoutContainer);