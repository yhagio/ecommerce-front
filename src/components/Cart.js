import React, { PropTypes } from 'react';
import { List } from 'immutable';

export default function Cart (props) {
  console.log('CART', props.cart)
  let cartList = [];
  let total = 0.0;
  props.cart.forEach((item, i) => {
    total += item.get('price');
    cartList.push(
      <li key={ i } className="cartItem">
        <div className="cart-el cart-product-image-box">
          <img src="" alt="product" className="cart-product-image" />
        </div>
        <p className="cart-el">{ item.get('name') }</p>
        <p className="cart-el">Price: ${ item.get('price') }</p>
        <div className="cart-el">
          <button
            className="remove-button"
            onClick={ (e) => props.deletefromCart(item.get('id')) }>Remove</button>
        </div>
      </li>
    )
  });
  
  return props.isFetching
  ? <h3>Loading ...</h3>
  : <div className="cartContainer">
      <h3>Your Cart</h3>
      <ul>
        { cartList }
      </ul>
      <div className="right">
        <p className="">Total: ${ total }</p>
        <div className="">
          <button className="payButton">Pay</button>
        </div>
      </div>
    </div>;
}

Cart.propTypes = {
  deletefromCart: PropTypes.func.isRequired,
  cart: PropTypes.instanceOf(List),
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};