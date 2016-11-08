import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as productsActions from '../redux/Products';
import Products from '../components/Products';
import './products.css';

class ProductsContainer extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <Products 
        products={ this.props.products }
        isFetching={ this.props.isFetching }
        error={ this.props.error }/>
    )
  }
}

ProductsContainer.propTypes = {
  products: PropTypes.instanceOf(List),
  fetchProducts: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
}

function mapStateToProps({ products }) {
  return {
    products: products.get('products'),
    isFetching: products.get('isFetching'),
    error: products.get('error'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(productsActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsContainer);