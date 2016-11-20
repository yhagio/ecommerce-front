import { Map } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'
import * as Signup from './Signup';
import { ROOT_URL } from '../constants';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

// Fake localStorage
global.localStorage = { 
  getItem: function(key) {
    return 'SomeToken';
  }
};

/******************************
 * Redux - Signup - Actions
 ******************************/
describe('[Redux - Signup] actions', () => {
  // Updatings
  it('should create an action when updating first name', () => {
    const firstName = 'Ali';
    const expectedAction = {
      type: Signup.UPDATE_FIRST_NAME,
      firstName
    };
    expect(Signup.updateFirstName(firstName)).toEqual(expectedAction);
  });

  it('should create an action when updating last name', () => {
    const lastName = 'Ali';
    const expectedAction = {
      type: Signup.UPDATE_LAST_NAME,
      lastName
    };
    expect(Signup.updateLastName(lastName)).toEqual(expectedAction);
  });

  it('should create an action when updating email', () => {
    const email = 'ema';
    const expectedAction = {
      type: Signup.UPDATE_EMAIL,
      email
    };
    expect(Signup.updateEmail(email)).toEqual(expectedAction);
  });

  it('should create an action when updating password', () => {
    const password = 'err';
    const expectedAction = {
      type: Signup.UPDATE_PASSWORD,
      password,
    };
    expect(Signup.updatePassword(password)).toEqual(expectedAction);
  });

  // Warnings
  it('should create an action when warning first name error', () => {
    const firstNameError = 'err';
    const expectedAction = {
      type: Signup.FIRST_NAME_ERROR,
      firstNameError,
    };
    expect(Signup.warnFirstNameError(firstNameError)).toEqual(expectedAction);
  });

  it('should create an action when warning last name error', () => {
    const lastNameError = 'err';
    const expectedAction = {
      type: Signup.LAST_NAME_ERROR,
      lastNameError,
    };
    expect(Signup.warnLastNameError(lastNameError)).toEqual(expectedAction);
  });

  it('should create an action when warning email error', () => {
    const emailError = 'err';
    const expectedAction = {
      type: Signup.EMAIL_ERROR,
      emailError,
    };
    expect(Signup.warnEmailError(emailError)).toEqual(expectedAction);
  });

  it('should create an action when warning password error', () => {
    const passwordError = 'err';
    const expectedAction = {
      type: Signup.PASSWORD_ERROR,
      passwordError,
    };
    expect(Signup.warnPasswordError(passwordError)).toEqual(expectedAction);
  });
});

/******************************
 * Redux - Signup - Reducers
 ******************************/
describe('[Redux - Signup] reducers', () => {
  // Updatings
  it('should return the initial state', () => {
    expect(
      Signup.default(undefined, {})
    ).toEqual(
      Map({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        passwordError: ''
      })
    );
  });

  it('should handle UPDATE_FIRST_NAME', () => {
    const firstName = 'Some';
    expect(
      Signup.default(undefined, {
        type: Signup.UPDATE_FIRST_NAME,
        firstName
      })
    ).toEqual(
      Map({
        firstName,
        lastName: '',
        email: '',
        password: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        passwordError: ''
      })
    );
  });

  it('should handle UPDATE_LAST_NAME', () => {
    const lastName = 'A';
    expect(
      Signup.default(undefined, {
        type: Signup.UPDATE_LAST_NAME,
        lastName
      })
    ).toEqual(
      Map({
        firstName: '',
        lastName,
        email: '',
        password: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        passwordError: ''
      })
    );
  });

  it('should handle UPDATE_EMAIL', () => {
    const email = 'some';
    expect(
      Signup.default(undefined, {
        type: Signup.UPDATE_EMAIL,
        email
      })
    ).toEqual(
      Map({
        firstName: '',
        lastName: '',
        email,
        password: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        passwordError: ''
      })
    );
  });

  it('should handle UPDATE_PASSWORD', () => { 
    const password = 'some';   
    expect(
      Signup.default(undefined, {
        type: Signup.UPDATE_PASSWORD,
        password
      })
    ).toEqual(
      Map({
        firstName: '',
        lastName: '',
        email: '',
        password,
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        passwordError: ''
      })
    );
  });

  // Warnings
  it('should handle FIRST_NAME_ERROR', () => {
    const firstNameError = 'Some';
    expect(
      Signup.default(undefined, {
        type: Signup.FIRST_NAME_ERROR,
        firstNameError
      })
    ).toEqual(
      Map({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        firstNameError,
        lastNameError: '',
        emailError: '',
        passwordError: ''
      })
    );
  });

  it('should handle LAST_NAME_ERROR', () => {
    const lastNameError = 'Some';
    expect(
      Signup.default(undefined, {
        type: Signup.LAST_NAME_ERROR,
        lastNameError
      })
    ).toEqual(
      Map({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        firstNameError: '',
        lastNameError,
        emailError: '',
        passwordError: ''
      })
    );
  });

  it('should handle EMAIL_ERROR', () => {
    const emailError = 'Some';
    expect(
      Signup.default(undefined, {
        type: Signup.EMAIL_ERROR,
        emailError
      })
    ).toEqual(
      Map({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        firstNameError: '',
        lastNameError: '',
        emailError,
        passwordError: ''
      })
    );
  });

  it('should handle PASSWORD_ERROR', () => {
    const passwordError = 'Some';
    expect(
      Signup.default(undefined, {
        type: Signup.PASSWORD_ERROR,
        passwordError
      })
    ).toEqual(
      Map({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        passwordError
      })
    );
  });
});

/************************************
 * Redux - Signup - Validations
 ************************************/
describe('[Validations] validateFirstName()', () => {
  it('should warn if first name is empty', () => {
    const firstName = '';
    const expectedAction = {
      type: Signup.FIRST_NAME_ERROR,
      firstNameError: 'First Name is required',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signup.validateFirstName(firstName))).toEqual(expectedAction); 
  });

  it('should warn if first name is longer than 29 characters', () => {
    const firstName = 'dsfhdsjfdsljkfhjksdhfjksdhfjkdshfkjhlsdaflsdkhflsdjkflsdasdfsdsdafa';
    const expectedAction = {
      type: Signup.FIRST_NAME_ERROR,
      firstNameError: 'First Name must be shorter than 30 characters',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signup.validateFirstName(firstName))).toEqual(expectedAction); 
  });
});

describe('[Validations] validateLastName()', () => {
  it('should warn if last name is empty', () => {
    const lastName = '';
    const expectedAction = {
      type: Signup.LAST_NAME_ERROR,
      lastNameError: 'Last Name is required',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signup.validateLastName(lastName))).toEqual(expectedAction); 
  });

  it('should warn if last name is longer than 29 characters', () => {
    const lastName = 'dsfhdsjfdsljkfhjksdhfjksdhfjkdshfkjhlsdaflsdkhflsdjkflsdasdfsdsdafa';
    const expectedAction = {
      type: Signup.LAST_NAME_ERROR,
      lastNameError: 'Last Name must be shorter than 30 characters',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signup.validateLastName(lastName))).toEqual(expectedAction); 
  });
});

describe('[Validations] validateEmail()', () => {
  it('should warn if email is less than 4 characters', () => {
    const email = 'aa.';
    const expectedAction = {
      type: Signup.EMAIL_ERROR,
      emailError: 'Email is required',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signup.validateEmail(email))).toEqual(expectedAction); 
  });

  it('should warn if email is longer than 50 characters', () => {
    const email = 'aaaaaaaaaaaaaaaaaaasddsfjldafdsljfhljsdahfkadsfjdfdsjkfdsfjsdfjklfljksdafhjksdhfjkdsfhsjdklafhsdjkf';
    const expectedAction = {
      type: Signup.EMAIL_ERROR,
      emailError: 'Your email address is too long',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signup.validateEmail(email))).toEqual(expectedAction); 
  });

  it('should warn if email is invalid', () => {
    const email = 'aadsfa34@..';
    const expectedAction = {
      type: Signup.EMAIL_ERROR,
      emailError: 'Please enter a valid email address',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signup.validateEmail(email))).toEqual(expectedAction); 
  });
});

describe('[Validations] validatePassword()', () => {
  it('should warn if password is less than 6 characters', () => {
    const password = 'aa.';
    const expectedAction = {
      type: Signup.PASSWORD_ERROR,
      passwordError: 'Password must be at least 6 characters',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signup.validatePassword(password))).toEqual(expectedAction); 
  });

  it('should warn if password is more than 39 characters', () => {
    const password = 'aadshlskjdhfjksmndfblsadfsdafljkdsljkfdshfjksdfjklsdhfjkhsdjfksdfjkhsdflkjdsfhjkdshfjksdflsdjhfljsdfsd';
    const expectedAction = {
      type: Signup.PASSWORD_ERROR,
      passwordError: 'Password must be shorter than 40 characters',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signup.validatePassword(password))).toEqual(expectedAction); 
  });

  it('should warn if password does not have a lowercase alphabet', () => {
    const password = '32423423423423HJHJHJHJHJ';
    const expectedAction = {
      type: Signup.PASSWORD_ERROR,
      passwordError: 'Password must have a lowercase alphabet',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signup.validatePassword(password))).toEqual(expectedAction); 
  });

  it('should warn if password does not have a uppercase alphabet', () => {
    const password = '324324kkfgdfgdfg';
    const expectedAction = {
      type: Signup.PASSWORD_ERROR,
      passwordError: 'Password must have a uppercase alphabet',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signup.validatePassword(password))).toEqual(expectedAction); 
  });

  it('should warn if password does not have a number', () => {
    const password = 'dsfASJLJd';
    const expectedAction = {
      type: Signup.PASSWORD_ERROR,
      passwordError: 'Password must have a number',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signup.validatePassword(password))).toEqual(expectedAction); 
  });
});