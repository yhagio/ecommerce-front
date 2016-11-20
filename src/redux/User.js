require('es6-promise').polyfill();
import axios from 'axios';
import { browserHistory } from 'react-router';
import { fromJS } from 'immutable';
import { ROOT_URL } from '../constants';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const FETCHING_USER = 'FETCHING_USER';
export const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';
export const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';

// Actions
export function authenticateUser (user) {
  return {
    type: AUTH_USER,
    user
  };
}

export function authenticationError (error) {
  return {
    type: AUTH_ERROR,
    error
  };
}

export function fetchingUser () {
  return {
    type: FETCHING_USER
  };
}

export function fetchingUserFailure (error) {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user.'
  };
}

export function fetchingUserSuccess (user) {
  return {
    type: FETCHING_USER_SUCCESS,
    user
  };
}

export function unauthUser () {
  return {
    type: UNAUTH_USER
  };
}

const initialState = fromJS({
  isFetching: false,
  error: '',
  isAuthenticated: false,
  authedUser: {},
});

// Users reducer
export default function usersReducer (state = initialState, action) {
  switch (action.type) {

    case AUTH_USER :
      return state.merge({
        isAuthenticated: true,
        authedUser: action.user
      });

    case UNAUTH_USER :
      return state.merge({
        isAuthenticated: false,
        authedUser: {}
      });

    case AUTH_ERROR :
      return state.merge({
        error: action.error
      });

    case FETCHING_USER:
      return state.merge({
        isFetching: true
      });

    case FETCHING_USER_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error
      });

    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? state.merge({
          isFetching: false,
          error: ''
        })
        : state.merge({
          isFetching: false,
          error: '',
          authedUser: action.user
        });

    default:
      return state;
  }
}

export function signoutUser () {
  return function (dispatch) {
    localStorage.removeItem('token');
    dispatch(unauthUser());
  };
}

export function signupUser ({firstName, lastName, email, password}) {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}/api/users`, {firstName, lastName, email, password})
      .then((res) => {
        // If request is correct
        // Update the state (authenticated)
        dispatch(authenticateUser(res.data.user));
        // Save JWT Token in localStorage
        localStorage.setItem('token', res.data.token);
        // Redirect user after authenticated
        dispatch(fetchingUserSuccess(res.data.user));
        // Redirect user to '/create-review' page
        return browserHistory.push('/account');
      })
      .catch((err) => {
        // If request is incorrect
        // Show user the error
        let error = 'Internal error occured.';
        // if (err.response && err.response.data && err.response.data.error) {
        //   error = err.response.data.error;
        // }
        return dispatch(authenticationError(error));
      });
  };
}

export function signinUser ({email, password}) {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}/auth/signin`, {email, password})
      .then((res) => {
        // If request is correct
        // Update the state (authenticated)
        dispatch(authenticateUser(res.data.user));
        // Save JWT Token in localStorage
        localStorage.setItem('token', res.data.token);
        // Redirect user after authenticated
        dispatch(fetchingUserSuccess(res.data.user));
        return browserHistory.push('/account');
      })
      .catch((err) => {
        // If request is incorrect
        // Show user the error
        let error = 'Internal error occured.';
        // if (err.response && err.response.data && err.response.data.error) {
        //   error = err.response.data.error;
        // }
        return dispatch(authenticationError(error));
      });
  };
}