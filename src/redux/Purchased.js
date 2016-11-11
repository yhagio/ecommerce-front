import axios from 'axios';
import { browserHistory } from 'react-router';
import { Map } from 'immutable';
import { ROOT_URL } from '../constants';
import { setHeaders } from '../helpers/utils';

export const FETCHING_PURCHASED_PRODUCT = 'FETCHING_PURCHASED_PRODUCT';
export const FETCHING_PURCHASED_PRODUCT_SUCCESS = 'FETCHING_PURCHASED_PRODUCT_SUCCESS';
export const FETCHING_PURCHASED_PRODUCT_FAILURE = 'FETCHING_PURCHASED_PRODUCT_FAILURE';

export function fetchingProduct () {
  return {
    type: FETCHING_PURCHASED_PRODUCT
  };
}

export function fetchingProductSuccess (product) {
  return {
    type: FETCHING_PURCHASED_PRODUCT_SUCCESS,
    product
  };
}

export function fetchingProductError (error) {
  return {
    type: FETCHING_PURCHASED_PRODUCT_FAILURE,
    error
  };
}

export function fetchPurchasedProduct (id) {
  return function (dispatch) {
    dispatch(fetchingProduct());
    return axios.get(`${ROOT_URL}/api/products/${id}/purchased`, setHeaders())
      .then((res) => {
        console.log('PURCHASED!! ', res.data);
        return dispatch(fetchingProductSuccess(res.data));
      })
      .catch((err) => {
        console.dir(err);
        let error = 'Not Purcached.';
        if (err.response && err.response.data && err.response.data) {
          error = err.response.data;
        }
        dispatch(fetchingProductError(error))
        return browserHistory.push(`/products/${id}/`);
      });
  };
}

const initialState = Map({
  product: {},
  error: '',
  isFetching: false,
});

export default function purchased (state = initialState, action) {
  switch (action.type) {

    case FETCHING_PURCHASED_PRODUCT :
      return state.merge({
        isFetching: true
      });

    case FETCHING_PURCHASED_PRODUCT_FAILURE :
      return state.merge({
        isFetching: false,
        error: action.error
      });

    case FETCHING_PURCHASED_PRODUCT_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        product: action.product,
      });

    default :
      return state;
  }
}