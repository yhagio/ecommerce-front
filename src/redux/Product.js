import axios from 'axios';
import { Map } from 'immutable';
import { ROOT_URL } from '../constants';

export const FETCHING_PRODUCT = 'FETCHING_PRODUCT';
export const FETCHING_PRODUCT_SUCCESS = 'FETCHING_PRODUCT_SUCCESS';
export const FETCHING_PRODUCT_FAILURE = 'FETCHING_PRODUCT_FAILURE';

export function fetchingProduct () {
  return {
    type: FETCHING_PRODUCT
  };
}

export function fetchingProductSuccess (product) {
  return {
    type: FETCHING_PRODUCT_SUCCESS,
    product
  };
}

export function fetchingProductError (error) {
  return {
    type: FETCHING_PRODUCT_FAILURE,
    error
  };
}

export function fetchProduct (id) {
  return function (dispatch) {
    dispatch(fetchingProduct());
    return axios.get(`${ROOT_URL}/api/products/${id}`)
      .then((res) => dispatch(fetchingProductSuccess(res.data)))
      .catch((err) => dispatch(fetchingProductError(err)));
  };
}

const initialState = Map({
  product: {},
  error: '',
  isFetching: false,
});

export default function product (state = initialState, action) {
  switch (action.type) {

    case FETCHING_PRODUCT :
      return state.merge({
        isFetching: true
      });

    case FETCHING_PRODUCT_FAILURE :
      return state.merge({
        isFetching: false,
        error: action.error
      });

    case FETCHING_PRODUCT_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        product: action.product,
      });

    default :
      return state;
  }
}