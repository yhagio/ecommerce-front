import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { List } from 'immutable';
// http://lorempixel.com/g/120/150
import productSmall from './productSmall.jpeg';

export default function Products (props) {
  let productList = [];
  props.products.forEach((product) => {
    productList.push(
      <Link to={ `products/${ product.get('id') }` } key={ product.get('id') } className="productItem">
        <li>
          <h4 className="productTitle">{ product.get('name') }</h4>
          <img src={ productSmall } alt="product" className="productImage" />
          <p className="price">Price: <span>{ product.get('price') }</span></p>
        </li>
      </Link>    
    );
  })

  return props.isFetching
  ? <h3>Fetching ...</h3>
  : props.products.size === 0 || props.error.length > 0
    ? <h3>No Products Found</h3>
    : (<div className="productsContainer">
         <ul className="productList">
           { productList }
         </ul>
       </div>)
}

Products.propTypes = {
  products: PropTypes.instanceOf(List),
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};