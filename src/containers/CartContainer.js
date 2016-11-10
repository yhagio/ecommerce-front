import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cartActions from '../redux/Cart';
import Cart from '../components/Cart';
import './cart.css';

class CartContainer extends Component {
  componentDidMount() {
    this.props.fetchCart();
  }
  render() {
    return (
      <Cart
        cart={ this.props.cart }
        isFetching={ this.props.isFetching }
        error={ this.props.error } />
    )
  }
}

CartContainer.propTypes = {
  fetchCart: PropTypes.func.isRequired,
  cart: PropTypes.instanceOf(List),
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

function mapStateToProps({ cart }) {
  return {
    cart: cart.get('cart'),
    isFetching: cart.get('isFetching'),
    error: cart.get('error'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(cartActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartContainer);