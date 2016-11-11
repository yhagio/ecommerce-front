import React from 'react';

export default function Purchased (props) {
  console.log('PROPS Product', props.product);
  return props.isFetching
  ? <h3>Loading ...</h3>
  : Object.keys(props.product).length === 0 || props.error.length > 0
    ? <p>{ props.error || 'No Product available' }</p>
    : <div className=''>
        <h3>You purchased : { props.product.get('description') }</h3>
      </div>;
}