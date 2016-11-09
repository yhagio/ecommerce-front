import { Map } from 'immutable';

export const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
export const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export const FIRST_NAME_ERROR = 'FIRST_NAME_ERROR';
export const LAST_NAME_ERROR = 'LAST_NAME_ERROR';
export const EMAIL_ERROR = 'EMAIL_ERROR';
export const PASSWORD_ERROR = 'PASSWORD_ERROR';

// Actions
export function updateFirstName (firstName) {
  return {
    type: UPDATE_FIRST_NAME,
    firstName
  };
}

export function updateLastName (lastName) {
  return {
    type: UPDATE_LAST_NAME,
    lastName
  };
}

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
export function warnFirstNameError (firstNameError) {
  return {
    type: FIRST_NAME_ERROR,
    firstNameError
  };
}

export function warnLastNameError (lastNameError) {
  return {
    type: LAST_NAME_ERROR,
    lastNameError
  };
}

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
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  firstNameError: '',
  lastNameError: '',
  emailError: '',
  passwordError: ''
});

// reducer
export default function signup (state = initialState, action) {
  switch (action.type) {

    case UPDATE_FIRST_NAME:
      return state.merge({
        firstName: action.firstName,
        firstNameError: ''
      });

    case UPDATE_LAST_NAME:
      return state.merge({
        lastName: action.lastName,
        lastNameError: ''
      });

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
    case FIRST_NAME_ERROR:
      return state.merge({
        firstNameError: action.firstNameError,
      });

    case LAST_NAME_ERROR:
      return state.merge({
        lastNameError: action.lastNameError,
      });

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