import axios from 'axios';
import { fromJS } from 'immutable';
import { ROOT_URL } from '../constants';
import { setHeaders } from '../helpers/utils';

export const FETCHING_CART = 'FETCHING_CART';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const FETCHING_CART_SUCCESS = 'FETCHING_CART_SUCCESS';
export const FETCHING_CART_FAILURE = 'FETCHING_CART_FAILURE';

export function fetchingCart () {
  return {
    type: FETCHING_CART
  };
}

export function addToCartSuccess () {
  return {
    type: ADD_TO_CART_SUCCESS,
    message: 'Added to cart.'
  };
}

export function fetchingCartSuccess (cart) {
  return {
    type: FETCHING_CART_SUCCESS,
    cart
  };
}

export function fetchingCartError (error) {
  return {
    type: FETCHING_CART_FAILURE,
    error
  };
}

export function addToCart (id) {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}/api/cart`, { id }, setHeaders())
      .then((res) => dispatch(addToCartSuccess()))
      .catch((err) => dispatch(fetchingCartError(err)));
  };
}

export function fetchCart () {
  return function (dispatch) {
    dispatch(fetchingCart());
    return axios.get(`${ROOT_URL}/api/cart`, setHeaders())
      .then((res) => dispatch(fetchingCartSuccess(res.data[0])))
      .catch((err) => dispatch(fetchingCartError(err)));
  };
}

const initialState = fromJS({
  cart: [],
  error: '',
  isFetching: false,
  message: '',
});

export default function cart (state = initialState, action) {
  switch (action.type) {

    case FETCHING_CART :
      return state.merge({
        isFetching: true
      });

    case ADD_TO_CART_SUCCESS :
      return state.merge({
        message: action.message
      });

    case FETCHING_CART_FAILURE :
      return state.merge({
        isFetching: false,
        error: action.error
      });

    case FETCHING_CART_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        cart: action.cart,
      });

    default :
      return state;
  }
}