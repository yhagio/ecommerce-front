import React, { Component, PropTypes } from 'react';
import Product from '../components/Product';
import './product.css';

class ProductContainer extends Component {
  render() {
    return (
      <Product />
    )
  }
}

ProductContainer.propTypes = {

};

export default ProductContainer;