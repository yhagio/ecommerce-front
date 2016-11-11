import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as purchasedActions from '../redux/Purchased';
import Purchased from '../components/Purchased';

class PurchasedProductContainer extends Component{
  componentDidMount() {
    this.props.fetchPurchasedProduct(this.props.params.id);
  }

  render() {
    return (
      <Purchased 
        product={ this.props.product }
        isFetching={ this.props.isFetching }
        error={ this.props.error } />
    );
  }
}

PurchasedProductContainer.propTypes = {
  fetchPurchasedProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

function mapStateToProps({ purchased }) {
  return {
    isFetching: purchased.get('isFetching'),
    error: purchased.get('error'),
    product: purchased.get('product'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(purchasedActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasedProductContainer);