import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as receiptsActions from '../redux/Receipts';
import Receipts from '../components/Receipts';

class ReceiptsContainer extends Component{
  componentDidMount() {
    this.props.fetchReceipts();
  }

  render() {
    return (
      <Receipts 
        receipts={ this.props.receipts }
        isFetching={ this.props.isFetching }
        error={ this.props.error } />
    );
  }
}

ReceiptsContainer.propTypes = {
  fetchReceipts: PropTypes.func.isRequired,
  receipts: PropTypes.instanceOf(List),
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

function mapStateToProps({ receipts }) {
  return {
    isFetching: receipts.get('isFetching'),
    error: receipts.get('error'),
    receipts: receipts.get('receipts'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(receiptsActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptsContainer);