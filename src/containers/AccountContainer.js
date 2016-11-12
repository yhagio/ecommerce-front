import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as accountActions from '../redux/Account';
import Account from '../components/Account';

class AccountContainer extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Account 
        updateUser={ this.props.updateUser }
        message={ this.props.message }

        updateFirstName={ this.props.updateFirstName }
        updateLastName={ this.props.updateLastName }
        updateEmail={ this.props.updateEmail }

        validateEmail={ this.props.validateEmail }
        validateFirstName={ this.props.validateFirstName }
        validateLastName={ this.props.validateLastName }

        emailError={ this.props.emailError }
        firstNameError={ this.props.firstNameError }
        lastNameError={ this.props.lastNameError }

        email={ this.props.email }
        firstName={ this.props.firstName }
        lastName={ this.props.lastName }

        user={ this.props.user }
        isFetching={ this.props.isFetching }
        error={ this.props.error } />
    )
  }
}

AccountContainer.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,

  updateFirstName: PropTypes.func.isRequired,
  updateLastName: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,

  validateEmail: PropTypes.func.isRequired,
  validateFirstName: PropTypes.func.isRequired,
  validateLastName: PropTypes.func.isRequired,

  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,

  firstNameError: PropTypes.string.isRequired,
  lastNameError: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,

  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}

function mapStateToProps({ account }) {
  return {
    user: account.get('user'),
    error: account.get('error'),
    message: account.get('message'),
    isFetching: account.get('isFetching'),
    firstName: account.get('firstName'),
    firstNameError: account.get('firstNameError'),
    lastName: account.get('lastName'),
    lastNameError: account.get('lastNameError'),
    email: account.get('email'),
    emailError: account.get('emailError'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(accountActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountContainer);