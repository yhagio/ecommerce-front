import React, { Component, PropTypes } from 'react';
import './cart.css';

class CartContainer extends Component {
  render() {
    let cartList = [];
    for (let i = 0; i < 3; i++) {
      cartList.push(
        <li key={i} className="cartItem">
          <div className="cart-el cart-product-image-box">
            <img src="" alt="product" className="cart-product-image" />
          </div>
          <p className="cart-el">Some Title</p>
          <p className="cart-el">Price: $18.00</p>
          <div className="cart-el">
            <button className="remove-button">Remove</button>
          </div>
        </li>
      )
    }

    return (
      <div className="cartContainer">
        <h3>Your Cart</h3>
        <ul>
          { cartList }
        </ul>
        <div className="right">
          <p className="">Total: $54.00</p>
          <div className="">
            <button className="payButton">Pay</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CartContainer;