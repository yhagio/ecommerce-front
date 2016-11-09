import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as usersActions from '../redux/User';
import * as signupActions from '../redux/Signup';
import Signup from '../components/Signup';

class SignupContainer extends Component {
  render() {
    return (
      <Signup 
        signupUser={ this.props.signupUser }
        error={ this.props.error }
        firstName={ this.props.firstName }
        lastName={ this.props.lastName }
        email={ this.props.email }
        password={ this.props.password }
        firstNameError={ this.props.firstNameError }
        lastNameError={ this.props.lastNameError }
        emailError={ this.props.emailError }
        passwordError={ this.props.passwordError }
        warnFirstNameError={ this.props.passwordError }
        warnLastNameError={ this.props.passwordError }
        warnEmailError={ this.props.passwordError }
        warnPasswordError={ this.props.passwordError } />
    )
  }
}

SignupContainer.propTypes = {
  signupUser: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  firstNameError: PropTypes.string.isRequired,
  lastNameError: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
  warnFirstNameError: PropTypes.func.isRequired,
  warnLastNameError: PropTypes.func.isRequired,
  warnEmailError: PropTypes.func.isRequired,
  warnPasswordError: PropTypes.func.isRequired,
}

function mapStateToProps({ signup, user}) {
  return {
    error: user.get('error'),
    firstName: signup.get('firstName'),
    lastName: signup.get('lastName'),
    email: signup.get('email'),
    password: signup.get('password'),
    firstNameError: signup.get('firstNameError'),
    lastNameError: signup.get('lastNameError'),
    emailError: signup.get('emailError'),
    passwordError: signup.get('passwordError')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...signupActions,
    ...usersActions
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupContainer);