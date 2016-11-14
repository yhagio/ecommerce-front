import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ForgotPass from '../components/ForgotPass';
import * as forgotpassActions from '../redux/ForgotPass';
import './main.css';

class ForgotPassContainer extends Component {
  render() {
    return (
      <div className="main">
        <ForgotPass
          submitEmail={ this.props.submitEmail }
          updateEmail={ this.props.updateEmail }
          validateEmail={ this.props.validateEmail }
          message={ this.props.message }
          error={ this.props.error }
          email={ this.props.email }
          emailError={ this.props.emailError } />
      </div>
    )
  }
}

ForgotPassContainer.propTypes = {
  submitEmail: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  validateEmail: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,
}

function mapStateToProps({ forgotpass }) {
  return {
    message: forgotpass.get('message'),
    error: forgotpass.get('error'),
    email: forgotpass.get('email'),
    emailError: forgotpass.get('emailError'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(forgotpassActions, dispatch);
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassContainer);