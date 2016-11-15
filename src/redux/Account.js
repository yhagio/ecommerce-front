import axios from 'axios';
import { Map } from 'immutable';
import { ROOT_URL } from '../constants';
import { setHeaders } from '../helpers/utils';

export const UPDATE_ACCOUNT_FIRST_NAME = 'UPDATE_ACCOUNT_FIRST_NAME';
export const UPDATE_ACCOUNT_LAST_NAME = 'UPDATE_ACCOUNT_LAST_NAME';
export const UPDATE_ACCOUNT_EMAIL = 'UPDATE_ACCOUNT_EMAIL';

export const ACCOUNT_FIRST_NAME_ERROR = 'ACCOUNT_FIRST_NAME_ERROR';
export const ACCOUNT_LAST_NAME_ERROR = 'ACCOUNT_LAST_NAME_ERROR';
export const ACCOUNT_EMAIL_ERROR = 'ACCOUNT_EMAIL_ERROR';

export const FETCHING_ACCOUNT_USER = 'FETCHING_ACCOUNT_USER';
export const FETCHING_ACCOUNT_USER_SUCCESS = 'FETCHING_ACCOUNT_USER_SUCCESS';
export const FETCHING_ACCOUNT_USER_FAILURE = 'FETCHING_ACCOUNT_USER_FAILURE';

export const UPDATED_MESSAGE = 'UPDATED_MESSAGE';
export const CLEAR_UPDATED_MESSAGE = 'CLEAR_UPDATED_MESSAGE';

// Update actions
export function updateFirstName (firstName) {
  return {
    type: UPDATE_ACCOUNT_FIRST_NAME,
    firstName
  };
}

export function updateLastName (lastName) {
  return {
    type: UPDATE_ACCOUNT_LAST_NAME,
    lastName
  };
}

export function updateEmail (email) {
  return {
    type: UPDATE_ACCOUNT_EMAIL,
    email
  };
}

export function notifyUpdateSuccess () {
  return {
    type: UPDATED_MESSAGE,
    message: 'Updated!'
  }
}

export function clearUpdateSuccess () {
  return {
    type: CLEAR_UPDATED_MESSAGE
  }
}

// Error actions
export function warnFirstNameError (firstNameError) {
  return {
    type: ACCOUNT_FIRST_NAME_ERROR,
    firstNameError
  };
}

export function warnLastNameError (lastNameError) {
  return {
    type: ACCOUNT_LAST_NAME_ERROR,
    lastNameError
  };
}

export function warnEmailError (emailError) {
  return {
    type: ACCOUNT_EMAIL_ERROR,
    emailError
  };
}

// Fetching actions
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

export function validateEmail (input) {
  return function(dispatch) {
    const email = input.trim();

    if (email.length < 4) return dispatch(warnEmailError('Email is required'));
    if (email.length > 50) return dispatch(warnEmailError('Your email address is too long'));
    if (!/.+@.+\../.test(email)) return dispatch(warnEmailError('Please enter a valid email address'));
  }
}

export function validateFirstName (input) {
  return function(dispatch) {
    const firstName = input.trim();

    if (firstName.length === 0) return dispatch(warnFirstNameError('First Name is required'));
    if (firstName.length > 29) return dispatch(warnFirstNameError('First Name must be shorter than 30 characters'));
  }
}

export function validateLastName (input) {
  return function(dispatch) {
    const lastName = input.trim();

    if (lastName.length === 0) return dispatch(warnLastNameError('Last Name is required'));
    if (lastName.length > 29) return dispatch(warnLastNameError('Last Name must be shorter than 30 characters'));
  }
}

export function fetchUser () {
  return function (dispatch) {
    dispatch(fetchingUser());
    return axios.get(`${ROOT_URL}/api/users/account`, setHeaders())
      .then((res) => dispatch(fetchingUserSuccess(res.data)))
      .catch((err) => {
        let error = 'Could not get the user infomation.';
        if (err.response && err.response.data && err.response.data) {
          error = err.response.data;
        }
        return dispatch(fetchingUserError(error))
      });
  };
}

export function updateUser (userObject) {
  return function (dispatch) {
    return axios.put(`${ROOT_URL}/api/users/account`, userObject, setHeaders())
      .then((res) => {
        dispatch(notifyUpdateSuccess());
        setTimeout(() => {
          dispatch(clearUpdateSuccess());
        }, 5000);
        return dispatch(fetchingUserSuccess(res.data))
      })
      .catch((err) => {
        let error = 'Could not update.';
        if (err.response && err.response.data && err.response.data) {
          error = err.response.data;
        }
        return dispatch(fetchingUserError(error))
      });
  };
}

const initialState = Map({
  user: {},
  error: '',
  isFetching: false,
  firstName: '',
  lastName: '',
  email: '',
  firstNameError: '',
  lastNameError: '',
  emailError: '',
  message: '',
});

export default function account (state = initialState, action) {
  switch (action.type) {

    // Update
    case UPDATE_ACCOUNT_FIRST_NAME :
      return state.merge({
        firstName: action.firstName,
        firstNameError: ''
      });

    case UPDATE_ACCOUNT_LAST_NAME :
      return state.merge({
        lastName: action.lastName,
        lastNameError: ''
      });

    case UPDATE_ACCOUNT_EMAIL :
      return state.merge({
        email: action.email,
        emailError: ''
      });

    case UPDATED_MESSAGE :
      return state.merge({
        message: action.message,
        error: ''
      });

    case CLEAR_UPDATED_MESSAGE :
      return state.merge({
        message: '',
        error: ''
      });

    // Error 
    case ACCOUNT_FIRST_NAME_ERROR :
      return state.merge({
        firstNameError: action.firstNameError
      });

    case ACCOUNT_LAST_NAME_ERROR :
      return state.merge({
        lastNameError: action.lastNameError
      });

    case ACCOUNT_EMAIL_ERROR :
      return state.merge({
        emailError: action.emailError
      });

    // Fetch
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