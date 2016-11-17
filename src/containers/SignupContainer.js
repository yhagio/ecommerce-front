import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as usersActions from '../redux/User';
import * as signupActions from '../redux/Signup';
import Signup from '../components/Auth/Signup';

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

        updateEmail={ this.props.updateEmail }
        updateFirstName={ this.props.updateFirstName }
        updateLastName={ this.props.updateLastName }
        updatePassword={ this.props.updatePassword }

        validateEmail={ this.props.validateEmail }
        validateFirstName={ this.props.validateFirstName }
        validateLastName={ this.props.validateLastName }
        validatePassword={ this.props.validatePassword } />
    )
  }
}

const { string, func } = PropTypes;

SignupContainer.propTypes = {
  signupUser: func.isRequired,
  error: string.isRequired,

  firstName: string.isRequired,
  lastName: string.isRequired,
  email: string.isRequired,
  password: string.isRequired,

  firstNameError: string.isRequired,
  lastNameError: string.isRequired,
  emailError: string.isRequired,
  passwordError: string.isRequired,

  updateEmail: func.isRequired,
  updateFirstName: func.isRequired,
  updateLastName: func.isRequired,
  updatePassword: func.isRequired,
  
  validateEmail: func.isRequired,
  validateFirstName: func.isRequired,
  validateLastName: func.isRequired,
  validatePassword: func.isRequired,
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