import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as productActions from '../redux/Product';
import Product from '../components/Product';
import './product.css';

class ProductContainer extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.params.id);
  }

  render() {
    return (
      <Product
        product={ this.props.product }
        isFetching={ this.props.isFetching }
        error={ this.props.error } />
    )
  }
}

ProductContainer.propTypes = {
  fetchProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

function mapStateToProps({ product }) {
  return {
    product: product.get('product'),
    isFetching: product.get('isFetching'),
    error: product.get('error')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(productActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductContainer);