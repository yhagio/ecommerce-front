import React from 'react';
import { Link } from 'react-router';

export default function Purchased (props) {
  return props.isFetching
  ? <h3>Loading ...</h3>
  : Object.keys(props.product).length === 0 || props.error.length > 0
    ? <p>{ props.error || 'No Product available' }</p>
    : <div className=''>
        <h3>You purchased : { props.product.get('description') }</h3>
        <Link to={`/products/${ props.product.get('product_id')}`}>Add Review</Link>
      </div>;
}