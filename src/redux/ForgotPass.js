import { Map } from 'immutable';
import axios from 'axios';
import { ROOT_URL } from '../constants';

export const UPDATE_YOUR_EMAIL = 'UPDATE_YOUR_EMAIL';
export const YOUR_EMAIL_ERROR = 'YOUR_EMAIL_ERROR';
export const RESET_PASS_SUCCESS = 'RESET_PASS_SUCCESS';
export const RESET_PASS_FAILURE = 'RESET_PASS_FAILURE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

// Actions
export function updateEmail (email) {
  return {
    type: UPDATE_YOUR_EMAIL,
    email
  };
}

// Form Error Actions
export function warnEmailError (emailError) {
  return {
    type: YOUR_EMAIL_ERROR,
    emailError
  };
}

export function resetPasswordSuccess(message) {
  return {
    type: RESET_PASS_SUCCESS,
    message
  }
}

export function clearMessage() {
  return {
    type: CLEAR_MESSAGE
  }
}

export function resetPasswordFailure(error) {
  return {
    type: RESET_PASS_FAILURE,
    error
  }
}

export function validateEmail (input) {
  return function(dispatch) {
    const email = input.trim();

    if (email.length < 4) return dispatch(warnEmailError('Email is required'));
    if (email.length > 50) return dispatch(warnEmailError('Your email address is too long'));
    if (!/.+@.+\../.test(email)) return dispatch(warnEmailError('Please enter a valid email address'));
  }
}

export function submitEmail (email) {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}/api/users/reset-password`, email)
      .then((res) => {
        dispatch(resetPasswordSuccess(res.data));
        return setTimeout(() => {
          dispatch(clearMessage());
        }, 5000);
      })
      .catch((err) => {
        let error = 'Not Purcached.';
        if (err.response && err.response.data && err.response.data) {
          error = err.response.data;
        }
        return dispatch(resetPasswordFailure(error));
      });
  }
}

const initialState = Map({
  error: '',
  message: '',
  email: '',
  emailError: '',
});

// reducer
export default function signin (state = initialState, action) {
  switch (action.type) {

    case UPDATE_YOUR_EMAIL:
      return state.merge({
        email: action.email,
        emailError: ''
      });

    // Form Errors
    case YOUR_EMAIL_ERROR:
      return state.merge({
        emailError: action.emailError,
      });

    case RESET_PASS_SUCCESS:
      return state.merge({
        message: action.message,
        error: ''
      });
    
    case CLEAR_MESSAGE:
      return state.merge({
        message: '',
        error: ''
      });

    case RESET_PASS_FAILURE:
      return state.merge({
        error: action.error,
        message: ''
      });

    default:
      return state;
  }
}