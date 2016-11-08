import axios from 'axios';
import { fromJS } from 'immutable';
import { ROOT_URL } from '../constants';

export const FETCHING_PRODUCTS = 'FETCHING_PRODUCTS';
export const FETCHING_PRODUCTS_SUCCESS = 'FETCHING_PRODUCTS_SUCCESS';
export const FETCHING_PRODUCTS_FAILURE = 'FETCHING_PRODUCTS_FAILURE';

export function fetchingProducts () {
  return {
    type: FETCHING_PRODUCTS
  };
}

export function fetchingProductsSuccess (products) {
  return {
    type: FETCHING_PRODUCTS_SUCCESS,
    products
  };
}

export function fetchingProductsError (error) {
  return {
    type: FETCHING_PRODUCTS_FAILURE,
    error
  };
}

export function fetchProducts () {
  return function (dispatch) {
    dispatch(fetchingProducts());
    return axios.get(`${ROOT_URL}/api/products`)
      .then((res) => {
        console.log('Data', res.data);
        return dispatch(fetchingProductsSuccess(res.data))
      })
      .catch((err) => {
        console.log('Err', err);
        dispatch(fetchingProductsError(err))
      });
  };
}

const initialState = fromJS({
  products: [],
  error: '',
  isFetching: false,
});

export default function products (state = initialState, action) {
  switch (action.type) {

    case FETCHING_PRODUCTS :
      return state.merge({
        isFetching: true
      });

    case FETCHING_PRODUCTS_FAILURE :
      return state.merge({
        isFetching: false,
        error: action.error
      });

    case FETCHING_PRODUCTS_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        products: action.products,
      });

    default :
      return state;
  }
}