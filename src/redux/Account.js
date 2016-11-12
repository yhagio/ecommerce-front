import axios from 'axios';
import { Map } from 'immutable';
import { ROOT_URL } from '../constants';
import { setHeaders } from '../helpers/utils';

export const FETCHING_ACCOUNT_USER = 'FETCHING_ACCOUNT_USER';
export const FETCHING_ACCOUNT_USER_SUCCESS = 'FETCHING_ACCOUNT_USER_SUCCESS';
export const FETCHING_ACCOUNT_USER_FAILURE = 'FETCHING_ACCOUNT_USER_FAILURE';

export function fetchingUser () {
  return {
    type: FETCHING_ACCOUNT_USER
  };
}

export function fetchingUserSuccess (user) {
  return {
    type: FETCHING_ACCOUNT_USER_SUCCESS,
    user
  };
}

export function fetchingUserError (error) {
  return {
    type: FETCHING_ACCOUNT_USER_FAILURE,
    error
  };
}

export function fetchUser () {
  return function (dispatch) {
    dispatch(fetchingUser());
    return axios.get(`${ROOT_URL}/api/users/account`, setHeaders())
      .then((res) => dispatch(fetchingUserSuccess(res.data)))
      .catch((err) => dispatch(fetchingUserError(err)));
  };
}

const initialState = Map({
  user: {},
  error: '',
  isFetching: false,
});

export default function account (state = initialState, action) {
  switch (action.type) {

    case FETCHING_ACCOUNT_USER :
      return state.merge({
        isFetching: true
      });

    case FETCHING_ACCOUNT_USER_FAILURE :
      return state.merge({
        isFetching: false,
        error: action.error
      });

    case FETCHING_ACCOUNT_USER_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        user: action.user,
      });

    default :
      return state;
  }
}