import axios from 'axios';
import { fromJS } from 'immutable';
import { ROOT_URL } from '../constants';
import { setHeaders } from '../helpers/utils';

export const FETCHING_RECEIPTS = 'FETCHING_RECEIPTS';
export const FETCHING_RECEIPTS_SUCCESS = 'FETCHING_RECEIPTS_SUCCESS';
export const FETCHING_RECEIPTS_FAILURE = 'FETCHING_RECEIPTS_FAILURE';

export function fetchingReceipts () {
  return {
    type: FETCHING_RECEIPTS
  };
}

export function fetchingReceiptsSuccess (receipts) {
  return {
    type: FETCHING_RECEIPTS_SUCCESS,
    receipts
  };
}

export function fetchingReceiptsError (error) {
  return {
    type: FETCHING_RECEIPTS_FAILURE,
    error
  };
}

export function fetchReceipts (id) {
  return function (dispatch) {
    dispatch(fetchingReceipts());
    return axios.get(`${ROOT_URL}/api/account/receipts`, setHeaders())
      .then((res) => {
        return dispatch(fetchingReceiptsSuccess(res.data));
      })
      .catch((err) => {
        let error = 'Could not retrieve any receipts.';
        // if (err.response && err.response.data && err.response.data) {
        //   error = err.response.data;
        // }
        return dispatch(fetchingReceiptsError(error))
      });
  };
}

const initialState = fromJS({
  receipts: [],
  error: '',
  isFetching: false,
});

export default function receipts (state = initialState, action) {
  switch (action.type) {

    case FETCHING_RECEIPTS :
      return state.merge({
        isFetching: true
      });

    case FETCHING_RECEIPTS_FAILURE :
      return state.merge({
        isFetching: false,
        error: action.error
      });

    case FETCHING_RECEIPTS_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        receipts: action.receipts,
      });

    default :
      return state;
  }
}