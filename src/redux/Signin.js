import { Map } from 'immutable';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export const EMAIL_ERROR = 'EMAIL_ERROR';
export const PASSWORD_ERROR = 'PASSWORD_ERROR';

// Actions
export function updateEmail (email) {
  return {
    type: UPDATE_EMAIL,
    email
  };
}

export function updatePassword (password) {
  return {
    type: UPDATE_PASSWORD,
    password
  };
}

// Form Error Actions
export function warnEmailError (emailError) {
  return {
    type: EMAIL_ERROR,
    emailError
  };
}

export function warnPasswordError (passwordError) {
  return {
    type: PASSWORD_ERROR,
    passwordError
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

export function validatePassword (input) {
  return function(dispatch) {
    const password = input.trim();

    if (password.length < 6) return dispatch(warnPasswordError('Password must be at least 6 characters'));
    if (password.length > 39) return dispatch(warnPasswordError('Password must be shorter than 40 characters'));
    if (!/[0-9]/.test(password)) return dispatch(warnPasswordError('Password must have a number'));
    if (!/[a-z]/.test(password)) return dispatch(warnPasswordError('Password must have a lowercase alphabet'));
    if (!/[A-Z]/.test(password)) return dispatch(warnPasswordError('Password must have a uppercase alphabet'));
  }
}

const initialState = Map({
  email: '',
  password: '',
  emailError: '',
  passwordError: ''
});

// reducer
export default function signin (state = initialState, action) {
  switch (action.type) {

    case UPDATE_EMAIL:
      return state.merge({
        email: action.email,
        emailError: ''
      });

    case UPDATE_PASSWORD:
      return state.merge({
        password: action.password,
        passwordError: ''
      });
      
    // Form Errors
    case EMAIL_ERROR:
      return state.merge({
        emailError: action.emailError,
      });

    case PASSWORD_ERROR:
      return state.merge({
        passwordError: action.passwordError,
      });

    default:
      return state;
  }
}