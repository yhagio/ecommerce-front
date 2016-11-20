import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import './purchased.css';

export default function Purchased (props) {
  return props.isFetching
  ? <h3>Loading ...</h3>
  : Object.keys(props.product).length === 0 || props.error.length > 0
    ? <p>{ props.error || 'No Product available' }</p>
    : <div className='purchasedContainer'>
        <h2>DEMO PRODUCT PAGE</h2>
        <h3>You purchased : { props.product.get('description') }</h3>
        <p>* This page should be the actual product content for this product</p>
        <Link to={`/products/${ props.product.get('product_id')}`}>Add Review / Go to product page</Link>
      </div>;
}

Purchased.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
};
