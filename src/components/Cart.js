/*global Stripe:true*/
import React, { PropTypes } from 'react';
import { List } from 'immutable';
import './card.css';

export default function Cart (props) {
  let cartList = [];
  let total = 0.0;
  let purchaseList = [];

  props.cart.forEach((item, i) => {
    total += item.get('price');
    purchaseList.push({
      product_id: item.get('product_id'),
      product_name: item.get('name'),
      product_price: item.get('price'),
    });

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

 function submitForm(e) {
    e.preventDefault();

    let form = document.getElementById('payment-form');

    function stripeResponseHandler(status, response) {

      if (response.error) { // Problem!

        // Show the errors on the form:
        form.querySelector('.payment-errors').innerHTML = response.error.message;

        form.querySelector('.submit').setAttribute('disabled', false); // Re-enable submission

      } else { // Token was created!

        // Get the token ID:
        const token = response.id;

        // Insert the token ID into the form so it gets submitted to the server:
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', 'stripeToken');
        input.value = token;
        form.appendChild(input);
        
        // Submit the form:
        // form.submit();
        const paymentObject = {
          token,
          purchaseList
        };
        props.payTotal(paymentObject);
      }
    };

    // form.addEventListener('submit', function(event) {
      // Disable the submit button to prevent repeated clicks:
      form.querySelector('.submit').setAttribute('disabled', true);

      // Request a token from Stripe:
      Stripe.card.createToken(form, stripeResponseHandler);

      // Prevent the form from being submitted:
      return false;
    // });
  }

  return props.isFetching
  ? <h3>Loading ...</h3>
  : <div className="cartContainer">
      <h3>Your Cart</h3>
      <ul>
        { cartList }
      </ul>
      {/* 
      <div className="right">
        <p className="">Total: ${ total }</p>
        <div className="">
          <button className="payButton">Pay</button>
        </div>
      </div>
      */}

      <form onSubmit={ submitForm } id="payment-form" className="cardForm">
        <span className="payment-errors"></span>

        <div className="formRow">
          <label>
            <span>Amount Total ($)</span>
            <input
              type="number"
              id="cartTotal"
              name="cartTotal"
              className="totalAmt cardInput"
              value={ total }
              required={ true }
              readOnly />
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>Card Number</span>
            <input
              type="text"
              className="cardInput card"
              size="20"
              data-stripe="number"
              defaultValue="4242 4242 4242 4242" />
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>Expiration (MM/YY)</span>
            <input
              type="text"
              className="cardInput exp"
              size="2"
              data-stripe="exp_month"
              defaultValue="12" />
          </label>
          <span> / </span>
          <input
            type="text"
            className="cardInput exp"
            size="2"
            data-stripe="exp_year"
            defaultValue="19" />
        </div>

        <div className="formRow">
          <label>
            <span>CVC</span>
            <input
              type="text"
              className="cardInput cvc"
              size="4"
              data-stripe="cvc"
              defaultValue="123" />
          </label>
        </div>

        <br />

        <input
          type="submit"
          className="submit payButton"
          value="Pay Now" />
      </form>
    </div>;
}

Cart.propTypes = {
  payTotal: PropTypes.func.isRequired,
  deletefromCart: PropTypes.func.isRequired,
  cart: PropTypes.instanceOf(List),
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};