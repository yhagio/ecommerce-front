import axios from 'axios';
import { fromJS } from 'immutable';
import { ROOT_URL } from '../constants';
import { setHeaders } from '../helpers/utils';
import { browserHistory } from 'react-router';

export const FETCHING_CART = 'FETCHING_CART';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE';
export const FETCHING_CART_SUCCESS = 'FETCHING_CART_SUCCESS';
export const FETCHING_CART_FAILURE = 'FETCHING_CART_FAILURE';
export const PAY_TOTAL_FAILURE = 'PAY_TOTAL_FAILURE';
export const PAID_TOTAL_SUCCESSFULLY = 'PAID_TOTAL_SUCCESSFULLY';

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

export function clearMessage () {
  return {
    type: CLEAR_ERROR_MESSAGE,
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

export function failedToPay (error) {
  return {
    type: PAY_TOTAL_FAILURE,
    error
  };
}

export function successfullyPaid () {
  return {
    type: PAID_TOTAL_SUCCESSFULLY,
  };
}

// Action Creators
export function addToCart (id) {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}/api/cart`, { id }, setHeaders())
      .then(res => {
        dispatch(addToCartSuccess())
        return setTimeout(() => {
          dispatch(clearMessage());
        }, 5000);
      })
      .catch((err) => {
        let error = 'Could not add the product.';
        // if (err.response && err.response.data && err.response.data) {
        //   error = err.response.data;
        // }
        dispatch(fetchingCartError(error));
        return setTimeout(() => {
          dispatch(clearMessage());
        }, 5000);
      });
  };
}

export function fetchCart () {
  return function (dispatch) {
    dispatch(fetchingCart());
    return axios.get(`${ROOT_URL}/api/cart`, setHeaders())
      .then(res => dispatch(fetchingCartSuccess(res.data[0])))
      .catch((err) => {
        let error = 'Could not get the cart infomation.';
        // if (err.response && err.response.data && err.response.data) {
        //   error = err.response.data;
        // }
        return dispatch(fetchingCartError(error));
      });
  };
}

export function deletefromCart (id) {
  return function (dispatch) {
    dispatch(fetchingCart());
    return axios.delete(`${ROOT_URL}/api/cart/${id}`, setHeaders())
      .then(res => dispatch(fetchingCartSuccess(res.data[0])))
      .catch((err) => {
        let error = 'Could not remove the product.';
        // if (err.response && err.response.data && err.response.data) {
        //   error = err.response.data;
        // }
        return dispatch(fetchingCartError(error));
      });
  };
}

export function payTotal (cartObject) {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}/api/payment`, cartObject, setHeaders())
      .then(res => {
        dispatch(successfullyPaid());
        return browserHistory.push('/account');
      })
      .catch(err => {
        let error = 'Could not purchase them.';
        // if (err.response && err.response.data && err.response.data) {
        //   error = err.response.data;
        // }
        return dispatch(failedToPay(error));
      });
  };
}

const initialState = fromJS({
  cart: [],
  error: '',
  isFetching: false,
  message: '',
});

// Reducers
export default function cart (state = initialState, action) {
  switch (action.type) {

    case FETCHING_CART :
      return state.merge({
        isFetching: true,
      });

    case ADD_TO_CART_SUCCESS :
      return state.merge({
        message: action.message,
      });
    
    case CLEAR_ERROR_MESSAGE :
      return state.merge({
        message: '',
        error: ''
      });

    case FETCHING_CART_FAILURE :
      return state.merge({
        isFetching: false,
        error: action.error,
      });

    case FETCHING_CART_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        cart: action.cart,
      });
    
    case PAY_TOTAL_FAILURE :
      return state.merge({
        isFetching: false,
        error: action.error,
      });
    
    case PAID_TOTAL_SUCCESSFULLY :
      return state.merge({
        isFetching: false,
        error: '',
      });

    default :
      return state;
  }
}