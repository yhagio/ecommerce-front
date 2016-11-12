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
        user={ this.props.user }
        isFetching={ this.props.isFetching }
        error={ this.props.error } />
    )
  }
}

AccountContainer.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
}

function mapStateToProps({ account }) {
  return {
    user: account.get('user'),
    error: account.get('error'),
    isFetching: account.get('isFetching')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(accountActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountContainer);