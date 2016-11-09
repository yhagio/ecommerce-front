import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as usersActions from '../redux/User';
import * as signinActions from '../redux/Signin';
import Signin from '../components/Signin';

class SigninContainer extends Component {
  render() {
    return (
      <Signin
        signinUser={ this.props.signinUser }
        error={ this.props.error }
        email={ this.props.email }
        password={ this.props.password }

        emailError={ this.props.emailError }
        passwordError={ this.props.passwordError }

        updateEmail={ this.props.updateEmail }
        updatePassword={ this.props.updatePassword }

        validateEmail={ this.props.validateEmail }
        validatePassword={ this.props.validatePassword } />
    )
  }
}

const { string, func } = PropTypes;

SigninContainer.propTypes = {
  signinUser: func.isRequired,
  error: string.isRequired,

  email: string.isRequired,
  password: string.isRequired,

  emailError: string.isRequired,
  passwordError: string.isRequired,

  updateEmail: func.isRequired,
  updatePassword: func.isRequired,
  
  validateEmail: func.isRequired,
  validatePassword: func.isRequired,
}

function mapStateToProps({ signin, user}) {
  return {
    error: user.get('error'),
    email: signin.get('email'),
    password: signin.get('password'),
    emailError: signin.get('emailError'),
    passwordError: signin.get('passwordError')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...signinActions,
    ...usersActions
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninContainer);