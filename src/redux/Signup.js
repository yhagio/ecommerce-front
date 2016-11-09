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
    type: UPDATE_FIRST_NAME,
    lastName
  };
}

export function updateEmail (email) {
  return {
    type: UPDATE_LAST_NAME,
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
export function warnFirstNameError () {
  return {
    type: FIRST_NAME_ERROR,
    usernameError: 'First name is required'
  };
}

export function warnLastNameError () {
  return {
    type: LAST_NAME_ERROR,
    usernameError: 'Last name is required'
  };
}

export function warnEmailError () {
  return {
    type: EMAIL_ERROR,
    emailError: 'Email is required'
  };
}

export function warnPasswordError () {
  return {
    type: PASSWORD_ERROR,
    passwordError: 'Password is required'
  };
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