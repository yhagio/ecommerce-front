import { Map } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'
import * as Signin from './Signin';
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
 * Redux - Signin - Actions
 ******************************/
describe('[Redux - Signin] actions', () => {
  it('should create an action when updating email', () => {
    const email = 'some';
    const expectedAction = {
      type: Signin.UPDATE_EMAIL,
      email
    };
    expect(Signin.updateEmail(email)).toEqual(expectedAction);
  });

  it('should create an action when updating password', () => {
    const password = '2';
    const expectedAction = {
      type: Signin.UPDATE_PASSWORD,
      password,
    };
    expect(Signin.updatePassword(password)).toEqual(expectedAction);
  });

  it('should create an action when theres is an email error', () => {
    const emailError = 'err'
    const expectedAction = {
      type: Signin.EMAIL_ERROR,
      emailError
    };
    expect(Signin.warnEmailError(emailError)).toEqual(expectedAction);
  });

  it('should create an action when theres is an password error', () => {
    const passwordError = 'err';
    const expectedAction = {
      type: Signin.PASSWORD_ERROR,
      passwordError,
    };
    expect(Signin.warnPasswordError(passwordError)).toEqual(expectedAction);
  });
});

/******************************
 * Redux - Signin - Reducers
 ******************************/
describe('[Redux - Signin] reducers', () => {
  it('should return the initial state', () => {
    expect(
      Signin.default(undefined, {})
    ).toEqual(
      Map({
        email: '',
        password: '',
        emailError: '',
        passwordError: ''
      })
    );
  });

  it('should handle UPDATE_EMAIL', () => {
    const email = 'Some';
    expect(
      Signin.default(undefined, {
        type: Signin.UPDATE_EMAIL,
        email
      })
    ).toEqual(
      Map({
        email,
        password: '',
        emailError: '',
        passwordError: ''
      })
    );
  });

  it('should handle UPDATE_PASSWORD', () => {
    const password = '5';
    expect(
      Signin.default(undefined, {
        type: Signin.UPDATE_PASSWORD,
        password
      })
    ).toEqual(
      Map({
        email: '',
        password,
        emailError: '',
        passwordError: ''
      })
    );
  });

  it('should handle EMAIL_ERROR', () => {
    const emailError = 'some err';
    expect(
      Signin.default(undefined, {
        type: Signin.EMAIL_ERROR,
        emailError
      })
    ).toEqual(
      Map({
        email: '',
        password: '',
        emailError,
        passwordError: ''
      })
    );
  });

  it('should handle PASSWORD_ERROR', () => { 
    const passwordError = 'some err';   
    expect(
      Signin.default(undefined, {
        type: Signin.PASSWORD_ERROR,
        passwordError
      })
    ).toEqual(
      Map({
        email: '',
        password: '',
        emailError: '',
        passwordError
      })
    );
  });
});

/************************************
 * Redux - Signin - Validations
 ************************************/
describe('[Validations] validateEmail()', () => {
  it('should warn if email is less than 4 characters', () => {
    const email = 'aa.';
    const expectedAction = {
      type: Signin.EMAIL_ERROR,
      emailError: 'Email is required',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signin.validateEmail(email))).toEqual(expectedAction); 
  });

  it('should warn if email is longer than 50 characters', () => {
    const email = 'aaaaaaaaaaaaaaaaaaasddsfjldafdsljfhljsdahfkadsfjdfdsjkfdsfjsdfjklfljksdafhjksdhfjkdsfhsjdklafhsdjkf';
    const expectedAction = {
      type: Signin.EMAIL_ERROR,
      emailError: 'Your email address is too long',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signin.validateEmail(email))).toEqual(expectedAction); 
  });

  it('should warn if email is invalid', () => {
    const email = 'aadsfa34@..';
    const expectedAction = {
      type: Signin.EMAIL_ERROR,
      emailError: 'Please enter a valid email address',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signin.validateEmail(email))).toEqual(expectedAction); 
  });
});

describe('[Validations] validatePassword()', () => {
  it('should warn if password is less than 6 characters', () => {
    const password = 'aa.';
    const expectedAction = {
      type: Signin.PASSWORD_ERROR,
      passwordError: 'Password must be at least 6 characters',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signin.validatePassword(password))).toEqual(expectedAction); 
  });

  it('should warn if password is more than 39 characters', () => {
    const password = 'aadshlskjdhfjksmndfblsadfsdafljkdsljkfdshfjksdfjklsdhfjkhsdjfksdfjkhsdflkjdsfhjkdshfjksdflsdjhfljsdfsd';
    const expectedAction = {
      type: Signin.PASSWORD_ERROR,
      passwordError: 'Password must be shorter than 40 characters',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signin.validatePassword(password))).toEqual(expectedAction); 
  });

  it('should warn if password does not have a lowercase alphabet', () => {
    const password = '32423423423423HJHJHJHJHJ';
    const expectedAction = {
      type: Signin.PASSWORD_ERROR,
      passwordError: 'Password must have a lowercase alphabet',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signin.validatePassword(password))).toEqual(expectedAction); 
  });

  it('should warn if password does not have a uppercase alphabet', () => {
    const password = '324324kkfgdfgdfg';
    const expectedAction = {
      type: Signin.PASSWORD_ERROR,
      passwordError: 'Password must have a uppercase alphabet',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signin.validatePassword(password))).toEqual(expectedAction); 
  });

  it('should warn if password does not have a number', () => {
    const password = 'dsfASJLJd';
    const expectedAction = {
      type: Signin.PASSWORD_ERROR,
      passwordError: 'Password must have a number',
    };

    const store = mockStore({ });

    expect(store.dispatch(Signin.validatePassword(password))).toEqual(expectedAction); 
  });
});