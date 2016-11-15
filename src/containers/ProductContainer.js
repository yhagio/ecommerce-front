import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { List } from 'immutable';

import * as productActions from '../redux/Product';
import * as cartActions from '../redux/Cart';
import Product from '../components/Product';
import './product.css';

class ProductContainer extends Component {
  componentDidMount() {
    // console.log('List: ', this.props.purchasedProductIds);
    this.props.fetchProduct(this.props.params.id);
  }

  render() {
    return (
      <Product
        product={ this.props.product }
        isFetching={ this.props.isFetching }
        error={ this.props.error }
        addToCart={ this.props.addToCart }
        message={ this.props.message } />
    )
  }
}

ProductContainer.propTypes = {
  fetchProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  // purchased: PropTypes.bool.isRequired,
  // purchasedProductIds: PropTypes.instanceOf(List),
};

function mapStateToProps({ product, cart, user }) {
  // console.log('Product', product.get('product'))
  return {
    product: product.get('product'),
    isFetching: product.get('isFetching'),
    error: product.get('error'),
    message: cart.get('message'),
    // purchased: product.get('purchased'),
    // purchasedProductIds: user.get('purchasedProductIds')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...productActions,
    ...cartActions
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductContainer);